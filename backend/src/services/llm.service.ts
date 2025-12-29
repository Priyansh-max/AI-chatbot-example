const SYSTEM_PROMPT = `You are a helpful support agent for Spur Store, a small e-commerce store. Answer clearly and concisely.

STORE INFORMATION:
- Store Name: Spur Store
- Shipping Policy: Free shipping on orders over $50. Standard shipping (5-7 business days) costs $5.99. Express shipping (2-3 business days) costs $12.99. We ship to USA, Canada, and select international destinations.
- Return/Refund Policy: Returns accepted within 30 days of purchase. Items must be unused and in original packaging. Refunds processed within 5-7 business days after receiving the returned item. Free return shipping on defective items.
- Support Hours: Monday-Friday, 9 AM - 6 PM EST. For urgent matters outside these hours, email support@spurstore.com.
- Payment Methods: We accept all major credit cards, PayPal, and Apple Pay.

GUIDELINES:
- Be friendly, professional, and helpful
- Keep responses concise but complete
- If you don't know something specific about products, admit it and offer to connect with a human agent
- Never make up information about specific products or inventory
- Always be honest about policies`;

export interface ChatMessage {
  role: "user" | "model";
  text: string;
}

interface GeminiResponse {
  candidates?: {
    content?: {
      parts?: { text?: string }[];
    };
    finishReason?: string;
  }[];
  error?: {
    message?: string;
  };
}

export async function generateReply(
  history: ChatMessage[],
  userMessage: string
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY || "";
  const model = process.env.GEMINI_MODEL || "gemini-2.0-flash";
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  try {
    // Build conversation context from history
    const conversationContext = history
      .map((msg) => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.text}`)
      .join("\n");

    const fullPrompt = `${SYSTEM_PROMPT}

${conversationContext ? `Previous conversation:\n${conversationContext}\n\n` : ""}User: ${userMessage}

Respond helpfully and concisely. Return your response as JSON with a "response" key.`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: fullPrompt }],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192,
          responseMimeType: "application/json",
        },
      }),
    });

    const data = (await response.json()) as GeminiResponse;

    if (!response.ok) {
      if (response.status === 400) {
        throw new Error(data.error?.message || "Invalid request. Please try rephrasing your message.");
      }
      if (response.status === 401 || response.status === 403) {
        throw new Error("Invalid API key. Please check your GEMINI_API_KEY.");
      }
      if (response.status === 429) {
        throw new Error("Rate limit exceeded. Please try again in a moment.");
      }
      if (response.status >= 500) {
        throw new Error("AI service temporarily unavailable. Please try again.");
      }
      throw new Error("Failed to generate response. Please try again.");
    }

    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      if (data.candidates?.[0]?.finishReason === "SAFETY") {
        throw new Error("I cannot respond to that request. Please try rephrasing.");
      }
      throw new Error("No response generated. Please try again.");
    }

    // Parse JSON response and extract the response field
    try {
      const parsed = JSON.parse(rawText);
      return (parsed.response || rawText).trim();
    } catch {
      return rawText.trim();
    }
  } catch (error: any) {
    // Re-throw if already formatted error message
    if (error.message && !error.message.includes("fetch")) {
      throw error;
    }

    // Network errors
    if (error.code === "ECONNREFUSED" || error.code === "ETIMEDOUT") {
      throw new Error("Unable to reach AI service. Please check your connection.");
    }

    throw new Error("Failed to generate response. Please try again.");
  }
}
