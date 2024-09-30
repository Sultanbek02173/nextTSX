"use client";

import React, { useEffect, useState } from 'react';
import { getPickupPoints } from '@/api/cdek';
import { CdekResponse, PickupPoint } from '@/types/cdek';

const PickupPointSelector = () => {
    const [city, setCity] = useState('');
    const [pickupPoints, setPickupPoints] = useState<PickupPoint[]>([]);
    const [selectedPoint, setSelectedPoint] = useState<PickupPoint | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPickupPoints = async () => {
            if (city) {
                setLoading(true);
                try {
                    const points: CdekResponse = await getPickupPoints(city);
                    setPickupPoints(points.points || []);
                } catch (error) {
                    console.error('Failed to fetch pickup points', error);
                } finally {
                    setLoading(false);
                }
            } else {
                setPickupPoints([]);
            }
        };

        fetchPickupPoints();
    }, [city]);

    return (
        <div>
            <h2>Select a Pickup Point</h2>
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter your city"
            />
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {pickupPoints.map((point) => (
                        <li key={point.code} onClick={() => setSelectedPoint(point)}>
                            {point.address}
                        </li>
                    ))}
                </ul>
            )}
            {selectedPoint && <p>Selected Point: {selectedPoint.address}</p>}
        </div>
    );
};

export default PickupPointSelector;