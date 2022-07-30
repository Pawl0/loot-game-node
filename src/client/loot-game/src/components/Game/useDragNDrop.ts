import { useEffect, useState } from "react";

interface DragNDropProps {
    dropElementClass?: string
}

export const useDragNDrop = ({ dropElementClass }: DragNDropProps) => {
    const [dragged, setDragged] = useState<HTMLElement | EventTarget | null>(null);
    useEffect(() => {
        const onDragStart = (event: DragEvent) => {
            setDragged(event.target);
        }
        document.addEventListener("dragstart", onDragStart);

        const onDragOver = (event: DragEvent) => {
            event.preventDefault();
        }
        document.addEventListener("dragover", onDragOver);

        return () => {
            document.removeEventListener("dragstart", onDragStart);
            document.removeEventListener("dragover", onDragOver);
        }
    }, []);

    useEffect(() => {
        const onDrop = (event: any) => {
            event.preventDefault();
            if (event?.target.className.includes(dropElementClass ?? "dropzone") && dragged) {
                const draggedNode = dragged as HTMLElement
                if (draggedNode.getAttribute("datatype") === "trade-ship") {
                    draggedNode.parentNode?.removeChild(draggedNode);
                    return event?.target?.appendChild(draggedNode);
                }
            }
        }
        document.addEventListener("drop", onDrop);

        return () => {
            document.removeEventListener("drop", onDrop);
        }
    }, [dragged]);

    return {
        dragged
    }
}