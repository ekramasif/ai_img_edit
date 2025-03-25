"use client";
import { useState } from "react";
import { ImageUpload } from "@/components/ImageUpload";
import { ImagePromptInput } from "@/components/ImagePromptInput";
import { ImageResultDisplay } from "@/components/ImageResultDisplay";
import { ImageIcon } from "lucide-react";
import { HistoryItem } from "@/lib/types";
import Header from "@/components/Header";
import PromptSuggestions from "@/components/PromptSuggestions";
import Footer from "@/components/Footer"; // Import the Footer component

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const handleImageSelect = (imageData: string) => {
    setImage(imageData || null);
  };

  const handlePromptSubmit = async (prompt: string) => {
    try {
      setLoading(true);
      setError(null);

      const imageToEdit = generatedImage || image;
      const requestData = {
        prompt,
        image: imageToEdit,
        history: history.length > 0 ? history : undefined,
      };

      const response = await fetch("/api/image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate image");
      }

      const data = await response.json();

      if (data.image) {
        setGeneratedImage(data.image);
        setDescription(data.description || null);

        const userMessage: HistoryItem = {
          role: "user",
          parts: [
            { text: prompt },
            ...(imageToEdit ? [{ image: imageToEdit }] : []),
          ],
        };

        const aiResponse: HistoryItem = {
          role: "model",
          parts: [
            ...(data.description ? [{ text: data.description }] : []),
            ...(data.image ? [{ image: data.image }] : []),
          ],
        };

        setHistory((prevHistory) => [...prevHistory, userMessage, aiResponse]);
      } else {
        setError("Server Error! Please try again later");
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
      console.error("Error processing request:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setImage(null);
    setGeneratedImage(null);
    setDescription(null);
    setLoading(false);
    setError(null);
    setHistory([]);
  };

  const currentImage = generatedImage || image;
  const isEditing = !!currentImage;
  const displayImage = generatedImage;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex flex-col">
      <div className="flex-grow">
        <div className="max-w-screen-xl mx-auto pb-20">
          <Header />

          <main className="px-4 sm:px-8 pt-8">
            <div className="max-w-3xl mx-auto text-center mb-12 animate-fade-in">
              <h2 className="text-3xl font-bold tracking-tight mb-3">Transform Your Ideas Into Art</h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Describe the image you want to create, and watch as AI brings your vision to life with stunning detail.
              </p>
            </div>

            {/* Error Display */}
            {error && (
              <div
                className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-900 dark:text-red-300"
                role="alert"
              >
                {error}
              </div>
            )}

            {/* Main Content */}
            {!displayImage && !loading ? (
              <>
                {/* Image Upload Section */}
                <ImageUpload
                  onImageSelect={handleImageSelect}
                  currentImage={currentImage}
                />

                {/* Prompt Input Section */}
                <ImagePromptInput
                  onSubmit={handlePromptSubmit}
                  isEditing={isEditing}
                  isLoading={loading}
                />

                <PromptSuggestions onSelectSuggestion={(suggestion) => handlePromptSubmit(suggestion)} />
              </>
            ) : loading ? (
              /* Loading State */
              <div
                role="status"
                className="flex flex-col items-center justify-center h-56 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"
                aria-label="Loading"
              >
                <ImageIcon className="w-12 h-12 text-gray-300 dark:text-gray-600" />
                <span className="mt-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                  Editing your image...
                </span>
              </div>
            ) : (
              <>
                {/* Image Result Display */}
                <ImageResultDisplay
                  imageUrl={displayImage || ""}
                  description={description}
                  onReset={handleReset}
                  conversationHistory={history}
                />

                {/* Prompt Input for Further Editing */}
                <ImagePromptInput
                  onSubmit={handlePromptSubmit}
                  isEditing={true}
                  isLoading={loading}
                />
              </>
            )}
          </main>
        </div>
      </div>
      <Footer /> {/* Include the Footer component */}
    </div>
  );
}
