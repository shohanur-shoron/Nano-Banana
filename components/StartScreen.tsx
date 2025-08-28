/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { UploadIcon, MagicWandIcon, PaletteIcon, SunIcon } from './icons';

interface StartScreenProps {
  onFileSelect: (files: FileList | null) => void;
  onGenerateFromPrompt: (prompt: string) => void;
  isLoading: boolean;
}

const StartScreen: React.FC<StartScreenProps> = ({ onFileSelect, onGenerateFromPrompt, isLoading }) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [activeTab, setActiveTab] = useState<'upload' | 'generate'>('upload');
  const [prompt, setPrompt] = useState('');


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFileSelect(e.target.files);
  };

  const handleGenerateClick = () => {
    if (prompt.trim() && !isLoading) {
      onGenerateFromPrompt(prompt);
    }
  };

  return (
    <div 
      className={`w-full max-w-5xl mx-auto text-center p-8 transition-all duration-300 rounded-2xl border-2 ${isDraggingOver && activeTab === 'upload' ? 'bg-blue-500/10 border-dashed border-blue-400' : 'border-transparent'}`}
      onDragOver={(e) => { if (activeTab === 'upload') { e.preventDefault(); setIsDraggingOver(true); } }}
      onDragLeave={() => setIsDraggingOver(false)}
      onDrop={(e) => {
        if (activeTab === 'upload') {
          e.preventDefault();
          setIsDraggingOver(false);
          onFileSelect(e.dataTransfer.files);
        }
      }}
    >
      <div className="flex flex-col items-center gap-6 animate-fade-in">
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-100 sm:text-6xl md:text-7xl">
          AI-Powered Photo Editing, <span className="text-blue-400">Simplified</span>.
        </h1>
        <p className="max-w-2xl text-lg text-gray-400 md:text-xl">
          Retouch photos, apply creative filters, or generate stunning images from scratch using simple text prompts.
        </p>

        <div className="mt-6 w-full max-w-md bg-gray-800/80 border border-gray-700/80 rounded-lg p-1.5 flex items-center justify-center gap-2 backdrop-blur-sm">
            <button
                onClick={() => setActiveTab('upload')}
                disabled={isLoading}
                className={`w-full capitalize font-semibold py-3 px-5 rounded-md transition-all duration-200 text-base disabled:opacity-60 disabled:cursor-not-allowed ${
                    activeTab === 'upload' 
                    ? 'bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-lg shadow-cyan-500/40' 
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
            >
                Edit a Photo
            </button>
            <button
                onClick={() => setActiveTab('generate')}
                disabled={isLoading}
                className={`w-full capitalize font-semibold py-3 px-5 rounded-md transition-all duration-200 text-base disabled:opacity-60 disabled:cursor-not-allowed ${
                    activeTab === 'generate' 
                    ? 'bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-lg shadow-cyan-500/40' 
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
            >
                Create with AI
            </button>
        </div>
        
        <div className="mt-4 w-full max-w-2xl">
          {activeTab === 'upload' && (
              <div className="flex flex-col items-center gap-4 animate-fade-in">
                  <label htmlFor="image-upload-start" className={`relative inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-white bg-blue-600 rounded-full group transition-colors ${isLoading ? 'cursor-not-allowed bg-blue-800' : 'cursor-pointer hover:bg-blue-500'}`}>
                      <UploadIcon className="w-6 h-6 mr-3 transition-transform duration-500 ease-in-out group-hover:rotate-[360deg] group-hover:scale-110" />
                      Upload an Image
                  </label>
                  <input id="image-upload-start" type="file" className="hidden" accept="image/*" onChange={handleFileChange} disabled={isLoading} />
                  <p className="text-sm text-gray-500">or drag and drop a file</p>
              </div>
          )}
          
          {activeTab === 'generate' && (
              <div className="flex flex-col items-center gap-4 animate-fade-in w-full">
                  <form onSubmit={(e) => { e.preventDefault(); handleGenerateClick(); }} className="w-full flex items-center gap-2">
                      <input
                          type="text"
                          value={prompt}
                          onChange={(e) => setPrompt(e.target.value)}
                          placeholder="e.g., 'a cute cat wearing a wizard hat'"
                          className="flex-grow bg-gray-800 border border-gray-700 text-gray-200 rounded-lg p-5 text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition w-full disabled:cursor-not-allowed disabled:opacity-60"
                          disabled={isLoading}
                      />
                      <button 
                          type="submit"
                          className="bg-gradient-to-br from-blue-600 to-blue-500 text-white font-bold py-5 px-8 text-lg rounded-lg transition-all duration-300 ease-in-out shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-px active:scale-95 active:shadow-inner disabled:from-blue-800 disabled:to-blue-700 disabled:shadow-none disabled:cursor-not-allowed disabled:transform-none"
                          disabled={isLoading || !prompt.trim()}
                      >
                          Generate
                      </button>
                  </form>
              </div>
          )}
        </div>


        <div className="mt-16 w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-black/20 p-6 rounded-lg border border-gray-700/50 flex flex-col items-center text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-gray-700 rounded-full mb-4">
                       <MagicWandIcon className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-100">Precise Retouching</h3>
                    <p className="mt-2 text-gray-400">Click any point on your image to remove blemishes, change colors, or add elements with pinpoint accuracy.</p>
                </div>
                <div className="bg-black/20 p-6 rounded-lg border border-gray-700/50 flex flex-col items-center text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-gray-700 rounded-full mb-4">
                       <PaletteIcon className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-100">Creative Filters</h3>
                    <p className="mt-2 text-gray-400">Transform photos with artistic styles. From vintage looks to futuristic glows, find or create the perfect filter.</p>
                </div>
                <div className="bg-black/20 p-6 rounded-lg border border-gray-700/50 flex flex-col items-center text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-gray-700 rounded-full mb-4">
                       <SunIcon className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-100">Pro Adjustments</h3>
                    <p className="mt-2 text-gray-400">Enhance lighting, blur backgrounds, or change the mood. Get studio-quality results without complex tools.</p>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default StartScreen;