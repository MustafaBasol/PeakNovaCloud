'use client'
import React, { useState } from 'react';

export default function PopUpBlog({ setIsOpen, item = {}, handleSubmit, error }) {
 
  const [formData, setFormData] = useState(item);

  const [contentBlocks, setContentBlocks] = useState(item.content || []);

 
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  
  const handleSeoChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      seo: {
        ...prevData.seo,
        [name]: value,
      },
    }));
  };

  const handleContentBlockChange = (index, event) => {
    const { name, value } = event.target;
    setContentBlocks((prevBlocks) => {
      const updatedBlocks = [...prevBlocks];
      updatedBlocks[index] = {
        ...updatedBlocks[index],
        [name]: value,
      };
      return updatedBlocks;
    });
  };

  const addContentBlock = (type) => {
    setContentBlocks((prevBlocks) => [
      ...prevBlocks,
      {
        type: type,
        content: '',
        title: '',
        imageUrl: '',
        caption: '',
      },
    ]);
  };

  const removeContentBlock = (index) => {
    setContentBlocks((prevBlocks) => prevBlocks.filter((_, i) => i !== index));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const updatedFormData = {
      ...formData,
      content: contentBlocks,
    };
    handleSubmit(event, updatedFormData);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="relative bg-white p-6 rounded-md w-4/6 max-h-screen overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">
          {item._id ? 'Edit Blog Post' : 'Add New Blog Post'}
        </h2>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <form onSubmit={onSubmit}>
          {/* Title */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* Slug */}
          <div className="mb-4">
            <label htmlFor="slug" className="block text-gray-700">
              Slug
            </label>
            <input
              type="text"
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* Summary */}
          <div className="mb-4">
            <label htmlFor="summary" className="block text-gray-700">
              Summary
            </label>
            <textarea
              id="summary"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* Cover Image */}
          <div className="mb-4">
            <label htmlFor="coverImage" className="block text-gray-700">
              Cover Image URL
            </label>
            <input
              type="text"
              id="coverImage"
              name="coverImage"
              value={formData.coverImage}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Language */}
          <div className="mb-4">
            <label htmlFor="language" className="block text-gray-700">
              Language
            </label>
            <select
              id="language"
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="en">English</option>
              <option value="tr">Turkish</option>
              <option value="fr">French</option>
            </select>
          </div>

          {/* SEO Fields */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">SEO Metadata</h3>
            <div className="mb-2">
              <label htmlFor="metaTitle" className="block text-gray-700">
                Meta Title
              </label>
              <input
                type="text"
                id="metaTitle"
                name="metaTitle"
                value={formData.seo.metaTitle || ''}
                onChange={handleSeoChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="metaDescription" className="block text-gray-700">
                Meta Description
              </label>
              <textarea
                id="metaDescription"
                name="metaDescription"
                value={formData.seo.metaDescription || ''}
                onChange={handleSeoChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="metaKeywords" className="block text-gray-700">
                Meta Keywords
              </label>
              <input
                type="text"
                id="metaKeywords"
                name="metaKeywords"
                value={formData.seo.metaKeywords || ''}
                onChange={handleSeoChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          {/* Content Blocks */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Content Blocks</h3>
            {contentBlocks.map((block, index) => (
              <div key={index} className="mb-4 p-4 border rounded">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-md font-semibold">Block {index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => removeContentBlock(index)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </div>
                {/* Type */}
                <div className="mb-2">
                  <label htmlFor={`type-${index}`} className="block text-gray-700">
                    Type
                  </label>
                  <select
                    id={`type-${index}`}
                    name="type"
                    value={block.type}
                    onChange={(e) => handleContentBlockChange(index, e)}
                    className="w-full p-2 border rounded"
                    required
                  >
                    <option value="text">Text</option>
                    <option value="image">Image</option>
                  </select>
                </div>
                {/* For Text Type */}
                {block.type === 'text' && (
                  <>
                    {/* Title */}
                    <div className="mb-2">
                      <label htmlFor={`title-${index}`} className="block text-gray-700">
                        Title
                      </label>
                      <input
                        type="text"
                        id={`title-${index}`}
                        name="title"
                        value={block.title}
                        onChange={(e) => handleContentBlockChange(index, e)}
                        className="w-full p-2 border rounded"
                        required
                      />
                    </div>
                    {/* Content */}
                    <div className="mb-2">
                      <label htmlFor={`content-${index}`} className="block text-gray-700">
                        Content
                      </label>
                      <textarea
                        id={`content-${index}`}
                        name="content"
                        value={block.content}
                        onChange={(e) => handleContentBlockChange(index, e)}
                        className="w-full p-2 border rounded"
                        required
                      />
                    </div>
                  </>
                )}
                {/* For Image Type */}
                {block.type === 'image' && (
                  <>
                    {/* Image URL */}
                    <div className="mb-2">
                      <label htmlFor={`imageUrl-${index}`} className="block text-gray-700">
                        Image URL
                      </label>
                      <input
                        type="text"
                        id={`imageUrl-${index}`}
                        name="imageUrl"
                        value={block.imageUrl}
                        onChange={(e) => handleContentBlockChange(index, e)}
                        className="w-full p-2 border rounded"
                        required
                      />
                    </div>
                    {/* Caption */}
                    <div className="mb-2">
                      <label htmlFor={`caption-${index}`} className="block text-gray-700">
                        Caption
                      </label>
                      <input
                        type="text"
                        id={`caption-${index}`}
                        name="caption"
                        value={block.caption}
                        onChange={(e) => handleContentBlockChange(index, e)}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  </>
                )}
              </div>
            ))}
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => addContentBlock('text')}
                className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
              >
                Add Text Block
              </button>
              <button
                type="button"
                onClick={() => addContentBlock('image')}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
              >
                Add Image Block
              </button>
            </div>
          </div>

          {/* Form Buttons */}
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="mr-4 px-4 py-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
              {item._id ? 'Save' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
