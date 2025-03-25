"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ImageIcon, Sparkles } from "lucide-react";
import { Input } from "./ui/input";

interface ImagePromptInputProps {
  onSubmit: (prompt: string) => void;
  isEditing: boolean;
  isLoading: boolean;
}

export function ImagePromptInput({
  onSubmit,
  isEditing,
  isLoading,
}: ImagePromptInputProps) {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onSubmit(prompt.trim());
      setPrompt("");
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto animate-slide-up"
    >
      <div className="relative group">
        <Input
          type="text"
          placeholder="Describe the image you want to create..."
          className="w-full py-6 pl-12 pr-36 text-base backdrop-blur-sm transition-all duration-200 glass focus-visible:ring-2 focus-visible:ring-primary/20"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={isLoading}
        />
        <ImageIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Button 
          type="submit" 
          className="absolute right-2 top-1/2 transform -translate-y-1/2 transition-all duration-300 bg-primary/90 hover:bg-primary text-primary-foreground"
          size="sm"
          disabled={isLoading || !prompt.trim()}
        >
          <span className="mr-2">{isEditing ? "Edit Image" : "Generate"}</span>
          <Sparkles className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}
