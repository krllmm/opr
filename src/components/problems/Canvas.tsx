import { Box } from '@mui/material';
import React, { useRef, useEffect, useState } from 'react';

interface Props {
    coordinates: number[][];
    order: number[];
}

const PathCanvas = ({ coordinates, order }: Props) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [hoveredCity, setHoveredCity] = useState<{ index: number; x: number; y: number } | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        if (canvas && context) {
            context.clearRect(0, 0, canvas.width, canvas.height);

            // Рисуем систему координат
            const gridSize = 50;
            context.strokeStyle = '#e0e0e0';
            context.lineWidth = 1;

            // Вертикальные линии
            for (let x = gridSize; x < canvas.width; x += gridSize) {
                context.beginPath();
                context.moveTo(x, 0);
                context.lineTo(x, canvas.height);
                context.stroke();
            }

            // Горизонтальные линии
            for (let y = gridSize; y < canvas.height; y += gridSize) {
                context.beginPath();
                context.moveTo(0, y);
                context.lineTo(canvas.width, y);
                context.stroke();
            }

            // Рисуем линии по порядку соединения точек
            context.strokeStyle = 'red';
            context.lineWidth = 2;
            context.beginPath();
            const firstPoint = coordinates[order[0]];
            context.moveTo(firstPoint[0], firstPoint[1]);
            order.slice(1).forEach((index) => {
                const point = coordinates[index];
                context.lineTo(point[0], point[1]);
            });
            context.stroke();

            // Рисуем точки поверх сетки и линий
            context.fillStyle = 'black';
            context.font = "12px Arial"; // Размер шрифта зависит от масштаба
            context.textAlign = 'left';
            context.textBaseline = 'middle';

            coordinates.forEach((point, index) => {
                context.beginPath();
                context.arc(point[0], point[1], 5, 0, Math.PI * 2);
                context.fill();

                context.fillStyle = 'black'; // Цвет текста

                const isNearRightEdge = point[0] + 25 > canvas.width;

                const textX = isNearRightEdge ? point[0] - 25 : point[0] + 10;
                const textY = point[1];

                context.fillText(
                    `#${index + 1}`,
                    textX, 
                    textY
                );
            });
        }
    }, [coordinates, order]);

    const handleMouseMove = (event: React.MouseEvent) => {
        const canvas = canvasRef.current;
        if (canvas) {
            const rect = canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            // Проверяем, наведена ли мышь на какую-то из точек
            const hovered = coordinates.findIndex(
                ([x, y]) => Math.hypot(mouseX - x, mouseY - y) < 5
            );

            if (hovered !== -1) {
                setHoveredCity({ index: hovered, x: coordinates[hovered][0] + 220, y: coordinates[hovered][1] });
            } else {
                setHoveredCity(null);
            }
        }
    };

    return (
        <Box sx={{ position: 'relative', display: 'inline-flex', width: "100%" }}>
            <canvas
                ref={canvasRef}
                width={350}
                height={300}
                style={{ border: '1px solid #000', marginInline: "auto" }}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setHoveredCity(null)}
            />
            {hoveredCity && (
                <div
                    style={{
                        position: 'absolute',
                        top: hoveredCity.y + 10,
                        left: hoveredCity.x + 10,
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        padding: '5px',
                        borderRadius: '4px',
                        border: '1px solid #ddd',
                        pointerEvents: 'none',
                    }}
                >
                    Город {hoveredCity.index + 1}: ({hoveredCity.x}, {hoveredCity.y})
                </div>
            )}
        </Box>
    );
};

export default PathCanvas;
