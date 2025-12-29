import { Router, Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../db";
import { generateReply, ChatMessage } from "../services/llm.service";

const router = Router();

// Validation schemas
const messageSchema = z.object({
  message: z
    .string()
    .min(1, "Message cannot be empty")
    .max(5000, "Message too long (max 5000 characters)"),
  sessionId: z.string().uuid().optional(),
});

const sessionIdSchema = z.string().uuid();

// POST /chat/message
router.post("/message", async (req: Request, res: Response) => {
  try {
    const validation = messageSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: validation.error.errors.map((e) => ({
          field: e.path.join("."),
          message: e.message,
        })),
      });
    }

    const { message, sessionId } = validation.data;
    let conversationId = sessionId;

    // Get or create conversation
    if (!conversationId) {
      const conversation = await prisma.conversation.create({ data: {} });
      conversationId = conversation.id;
    } else {
      const exists = await prisma.conversation.findUnique({
        where: { id: conversationId },
      });
      if (!exists) {
        return res.status(404).json({ error: "Conversation not found" });
      }
    }

    // Save user message
    await prisma.message.create({
      data: {
        conversationId,
        sender: "user",
        text: message,
      },
    });

    // Get conversation history (last 20 messages for context)
    const history = await prisma.message.findMany({
      where: { conversationId },
      orderBy: { timestamp: "asc" },
      take: 20,
    });

    // Format history for LLM (exclude the message we just added)
    const chatHistory: ChatMessage[] = history.slice(0, -1).map((msg) => ({
      role: msg.sender === "user" ? "user" : "model",
      text: msg.text,
    }));

    // Generate AI reply
    let reply: string;
    try {
      reply = await generateReply(chatHistory, message);
    } catch (error: any) {
      return res.status(500).json({
        error: "Failed to generate reply",
        message: error.message,
        sessionId: conversationId,
      });
    }

    // Save AI reply
    await prisma.message.create({
      data: {
        conversationId,
        sender: "ai",
        text: reply,
      },
    });

    // Update conversation timestamp
    await prisma.conversation.update({
      where: { id: conversationId },
      data: { updatedAt: new Date() },
    });

    return res.json({
      reply,
      sessionId: conversationId,
    });
  } catch (error: any) {
    console.error("Chat error:", error);
    return res.status(500).json({
      error: "Internal server error",
      message: "An unexpected error occurred",
    });
  }
});

// GET /chat/conversations - List all conversations
router.get("/conversations", async (req: Request, res: Response) => {
  try {
    const conversations = await prisma.conversation.findMany({
      orderBy: { updatedAt: "desc" },
      take: 20,
      include: {
        messages: {
          take: 1,
          orderBy: { timestamp: "asc" },
          select: { text: true },
        },
      },
    });

    return res.json({
      conversations: conversations.map((c) => ({
        id: c.id,
        createdAt: c.createdAt,
        updatedAt: c.updatedAt,
        preview: c.messages[0]?.text?.slice(0, 50) || "No messages",
      })),
    });
  } catch (error: any) {
    console.error("Conversations error:", error);
    return res.status(500).json({
      error: "Internal server error",
      message: "Failed to fetch conversations",
    });
  }
});

// GET /chat/history/:sessionId
router.get("/history/:sessionId", async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;

    const validation = sessionIdSchema.safeParse(sessionId);
    if (!validation.success) {
      return res.status(400).json({ error: "Invalid session ID format" });
    }

    const conversation = await prisma.conversation.findUnique({
      where: { id: sessionId },
    });

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    const messages = await prisma.message.findMany({
      where: { conversationId: sessionId },
      orderBy: { timestamp: "asc" },
      select: {
        id: true,
        sender: true,
        text: true,
        timestamp: true,
      },
    });

    return res.json({
      sessionId,
      messages,
    });
  } catch (error: any) {
    console.error("History error:", error);
    return res.status(500).json({
      error: "Internal server error",
      message: "Failed to fetch conversation history",
    });
  }
});

export default router;
