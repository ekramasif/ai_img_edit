import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface PromptSuggestionsProps {
  onSelectSuggestion: (suggestion: string) => void;
  className?: string;
}

const PromptSuggestions: React.FC<PromptSuggestionsProps> = ({
  onSelectSuggestion,
  className
}) => {
  const suggestions = [
    "A breathtaking cyberpunk skyline at night",
    "Mystical forest with glowing mushrooms and fireflies",
    "A space station orbiting a gas giant",
    "A lost underwater city with ancient ruins",
    "A steampunk airship floating above the clouds",
    "A futuristic AI-controlled metropolis"
  ];

  return (
    <div className={cn("w-full max-w-3xl mx-auto py-6 text-center", className)}>
      <h3 className="text-lg font-semibold text-muted-foreground mb-4">Feeling uninspired? Try one of these prompts:</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {suggestions.map((suggestion, index) => (
          <motion.button
            key={index}
            onClick={() => onSelectSuggestion(suggestion)}
            className="px-5 py-3 rounded-lg text-sm bg-gray-700 text-gray-200 shadow-neumorphic hover:shadow-neumorphic-hover hover:scale-105 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {suggestion}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default PromptSuggestions;
