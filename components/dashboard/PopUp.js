'use client'
import React, { useState } from 'react';
import * as Form from '@radix-ui/react-form';
import { getEntityId } from '@/libs/entityId';

export default function PopUp({ setIsOpen, item = {}, handleSubmit, error }) {
  const [formData, setFormData] = useState(item);
  const [cards, setCards] = useState(formData.cards || []);

  // Filter out fields we don't want to edit directly
  const editableFields = Object.keys(formData).filter(
    key => !['id', '_id', 'createdAt', 'updatedAt', '__v', 'language', 'cards'].includes(key)
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleCardChange = (index, e) => {
    const { name, value } = e.target;
    setCards(prevCards => {
      const updatedCards = [...prevCards];
      updatedCards[index][name] = value;
      return updatedCards;
    });
  };

  const addCard = () => {
    setCards(prevCards => [
      ...prevCards,
      { title: '', description: '', Icon: '', color: '' },
    ]);
  };

  const removeCard = (index) => {
    setCards(prevCards => prevCards.filter((_, i) => i !== index));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const updatedFormData = { ...formData };
    if (cards.length > 0) {
      updatedFormData.cards = cards;
    } else {
      delete updatedFormData.cards;
    }
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
          {getEntityId(item) ? 'Edit Item' : 'Add New Item'}
        </h2>

        {/* Display top-level error if present */}
        {error && <div className="text-red-500 mb-2">{error}</div>}

        <Form.Root onSubmit={onSubmit}>
          {editableFields.map((key) => (
            <Form.Field key={key} name={key} className="mb-4">
              <Form.Label className="block text-gray-700 capitalize">
                {key}
              </Form.Label>
              <Form.Control asChild>
                {key === 'ogDescription' || key === 'keywords' || key === 'description' || key === 'answer' ? (
                  <textarea
                    name={key}
                    value={formData[key] || ''}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  <input
                    type="text"
                    name={key}
                    value={formData[key] || ''}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    // Example: If you want this field to be required:
                    // required
                  />
                )}
              </Form.Control>
              {/* Display validation messages if using HTML constraints */}
              <Form.Message match="valueMissing">
                This field is required.
              </Form.Message>
              <Form.Message match="customError"></Form.Message>
            </Form.Field>
          ))}

          {(cards.length > 0 || 'cards' in item) && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Cards</h3>
              {cards.map((card, index) => (
                <div key={getEntityId(card) || index} className="mb-4 p-4 border rounded">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-md font-semibold">Card {index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => removeCard(index)}
                      className="text-red-500"
                    >
                      Remove
                    </button>
                  </div>

                  {/* Card Title Field */}
                  <Form.Field name={`cards[${index}].title`} className="mb-2">
                    <Form.Label className="block text-gray-700 capitalize">Title</Form.Label>
                    <Form.Control asChild>
                      <input
                        type="text"
                        name="title"
                        value={card.title || ''}
                        onChange={(e) => handleCardChange(index, e)}
                        className="w-full p-2 border rounded"
                        // required if needed
                      />
                    </Form.Control>
                    <Form.Message match="valueMissing">Title is required.</Form.Message>
                  </Form.Field>

                  {/* Card Icon Field */}
                  <Form.Field name={`cards[${index}].Icon`} className="mb-2">
                    <Form.Label className="block text-gray-700 capitalize">Icon</Form.Label>
                    <Form.Control asChild>
                      <input
                        type="text"
                        name="Icon"
                        value={card.Icon || ''}
                        onChange={(e) => handleCardChange(index, e)}
                        className="w-full p-2 border rounded"
                      />
                    </Form.Control>
                  </Form.Field>

                  {/* Card Description Field */}
                  <Form.Field name={`cards[${index}].description`}>
                    <Form.Label className="block text-gray-700 capitalize">Description</Form.Label>
                    <Form.Control asChild>
                      <textarea
                        name="description"
                        value={card.description || ''}
                        onChange={(e) => handleCardChange(index, e)}
                        className="w-full p-2 border rounded"
                      />
                    </Form.Control>
                  </Form.Field>
                </div>
              ))}
              <button
                type="button"
                onClick={addCard}
                className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
              >
                Add Card
              </button>
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="mr-4 px-4 py-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
            <Form.Submit asChild>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                {getEntityId(item) ? 'Save' : 'Add'}
              </button>
            </Form.Submit>
          </div>
        </Form.Root>
      </div>
    </div>
  );
}
