// src/hooks/useArtworkQueue.js
import { useState, useEffect } from 'react';
import ArtworkQueue from '../Utility/Queue';

const useArtworkQueue = (maxSize = 7) => {
    const [queue, setQueue] = useState(new ArtworkQueue(maxSize));
    const [newArtworks, setNewArtworks] = useState([]);

    // Load queue from localStorage on component mount
    useEffect(() => {
        const savedQueue = localStorage.getItem('artworkQueue');
        if (savedQueue) {
            try {
                const parsedQueue = JSON.parse(savedQueue);
                const newQueue = new ArtworkQueue(maxSize);
                newQueue.initializeFromArray(parsedQueue);
                setQueue(newQueue);
                setNewArtworks(newQueue.getQueue());
            } catch (error) {
                console.error('Error loading queue from localStorage:', error);
            }
        }
    }, [maxSize]);

    // Save queue to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('artworkQueue', JSON.stringify(queue.getQueue()));
        setNewArtworks(queue.getQueue());
    }, [queue]);

    // Add artwork to the queue
    const addToQueue = (artwork) => {
        const newQueue = new ArtworkQueue(queue.maxSize);
        newQueue.initializeFromArray(queue.getQueue());
        const added = newQueue.enqueue(artwork);

        if (added) {
            setQueue(newQueue);
            return true;
        }
        return false;
    };

    // Remove artwork from the queue
    const removeFromQueue = (artworkId) => {
        const newQueue = new ArtworkQueue(queue.maxSize);
        const currentQueue = queue.getQueue();
        const filteredQueue = currentQueue.filter(item => item.artwork_id !== artworkId);

        newQueue.initializeFromArray(filteredQueue);
        setQueue(newQueue);
    };

    // Clear the entire queue
    const clearQueue = () => {
        const newQueue = new ArtworkQueue(queue.maxSize);
        setQueue(newQueue);
    };

    return {
        newArtworks,
        addToQueue,
        removeFromQueue,
        clearQueue,
        isFull: queue.isFull(),
        isEmpty: queue.isEmpty(),
        size: queue.size()
    };
};

export default useArtworkQueue;