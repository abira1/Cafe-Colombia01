import React, { useState } from 'react';
import { Trash2, Image as ImageIcon, Plus } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
interface GalleryImage {
  id: string;
  url: string;
  description: string;
}
export function GalleryManager() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageDescription, setImageDescription] = useState<string>('');

  // Handle Image Upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Save Image & Description
  const saveImage = () => {
    if (previewImage && imageDescription.trim()) {
      setImages([...images, {
        id: uuidv4(),
        url: previewImage,
        description: imageDescription
      }]);
      setPreviewImage(null); // Clear preview
      setImageDescription(''); // Clear description field
    }
  };

  // Delete Image
  const deleteImage = (id: string) => {
    setImages(images.filter(image => image.id !== id));
  };
  return <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-6">Gallery Management</h2>

      {/* Upload Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Upload New Image</h3>
        <div className="flex flex-col gap-4">
          <label className="border rounded px-3 py-2 flex items-center cursor-pointer">
            <ImageIcon className="w-5 h-5 mr-2" /> Upload Image
            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
          </label>

          {previewImage && <>
              <img src={previewImage} alt="Preview" className="h-24 w-24 rounded border" />
              <input type="text" placeholder="Enter image description..." className="border rounded px-3 py-2 w-full" value={imageDescription} onChange={e => setImageDescription(e.target.value)} />
              <button onClick={saveImage} className="bg-green-600 text-white px-4 py-2 rounded flex items-center">
                <Plus className="w-4 h-4 mr-2" /> Save Image
              </button>
            </>}
        </div>
      </div>

      {/* Gallery Display */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Gallery Images</h3>
        {images.length === 0 ? <p className="text-gray-600">No images in the gallery.</p> : <div className="grid grid-cols-3 gap-4">
            {images.map(image => <div key={image.id} className="relative border p-2 rounded-lg shadow-sm">
                <img src={image.url} alt="Gallery" className="h-24 w-24 rounded mx-auto" />
                <p className="text-sm text-gray-600 mt-2 text-center">{image.description}</p>
                <button onClick={() => deleteImage(image.id)} className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>)}
          </div>}
      </div>
    </div>;
}