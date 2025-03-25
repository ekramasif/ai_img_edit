"use client";

import { Button } from "@/components/ui/button";
import { Download, RotateCcw, MessageCircle } from "lucide-react";
import { useState } from "react";
import { HistoryItem, HistoryPart } from "@/lib/types";
import { cn } from "@/lib/utils"; // Assuming you have a utility function for class names

interface ImageResultDisplayProps {
  imageUrl: string;
  description: string | null;
  onReset: () => void;
  conversationHistory?: HistoryItem[];
  className?: string;
}

export function ImageResultDisplay({
  imageUrl,
  description,
  onReset,
  conversationHistory = [],
  className,
}: ImageResultDisplayProps) {
  const [showHistory, setShowHistory] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `edited-by-ishat${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  return (
    <div
      className={cn(
        "w-full max-w-2xl mx-auto mt-8 rounded-2xl overflow-hidden glass transition-all duration-500",
        !imageUrl && "hidden",
        className
      )}
    >
      {imageUrl && (
        <div className="relative">
          <div
            className={cn(
              "w-full overflow-hidden bg-secondary/20",
              !isLoaded && "shimmer"
            )}
          >
            <img
              src={imageUrl}
              alt={description || "Generated Image"}
              className={cn(
                "w-full h-auto object-contain",
                isLoaded ? "opacity-100" : "opacity-0"
              )}
              onLoad={() => setIsLoaded(true)}
            />
          </div>
          <div className="p-4 flex justify-between items-start">
            <p className="text-sm leading-relaxed text-foreground/80 font-medium max-w-[80%]">
              {description}
            </p>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDownload}
              className="text-muted-foreground hover:text-foreground"
            >
              <Download className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}

      {showHistory && conversationHistory.length > 0 && (
        <div className="p-4 rounded-lg mb-4">
          <h3 className="text-sm font-medium mb-4">Conversation History</h3>
          <div className="space-y-4">
            {conversationHistory.map((item, index) => (
              <div key={index} className={`p-3 rounded-lg bg-secondary`}>
                <p
                  className={`text-sm font-medium mb-2 ${
                    item.role === "user" ? "text-foreground" : "text-primary"
                  }`}
                >
                  {item.role === "user" ? "You" : "Ishat"}
                </p>
                <div className="space-y-2">
                  {item.parts.map((part: HistoryPart, partIndex) => (
                    <div key={partIndex}>
                      {part.text && <p className="text-sm">{part.text}</p>}
                      {part.image && (
                        <div className="mt-2 overflow-hidden rounded-md">
                          <img
                            src={part.image}
                            alt={`${item.role} image`}
                            className="w-full h-auto object-contain"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mt-2 mb-4">
        <Button variant="outline" size="sm" onClick={onReset}>
          <RotateCcw className="w-4 h-4 mr-2" />
          Create New Image
        </Button>
        {conversationHistory.length > 0 && (
          <Button variant="outline" size="sm" onClick={toggleHistory}>
            <MessageCircle className="w-4 h-4 mr-2" />
            {showHistory ? "Hide History" : "Show History"}
          </Button>
        )}
      </div>
    </div>
  );
}
