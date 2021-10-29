import React from 'react';
import Box from '@mui/material/Box';
import { SxProps } from '@mui/system';
import { useDrop } from 'react-dnd';

import TaskCard, { TaskProps } from './TaskCard';
import { ItemTypes } from './ItemTypes';

interface Props {
    status : string,
    taskData: Array<TaskProps>,
    handleDragDropMovement: (arg0: number, arg1: string) => void,
    handleTaskDelete: (id: number) => void
}

const StatusBox: React.FC<Props> = ({ status, taskData, handleDragDropMovement, handleTaskDelete }) => {

    const [{isOver}, drop] = useDrop({
		accept: ItemTypes.CARD,
		drop: (item: any, monitor) => handleDragDropMovement(item.taskId, status),
		collect: (monitor) => ({
			isOver: !!monitor.isOver()
		})
	});

    return (
        <Box
            sx={boxStyle}
            ref={drop}
        >
            <h3 style={{ marginLeft: '10%' }}>{status}</h3>
            
            { taskData.map(task => 
                <TaskCard
                    key= {task.id}
                    handleTaskDelete={handleTaskDelete}
                    task = {{
                        id : task.id,
                        status: task.status,
                        description: task.description,
                        title: task.title
                    }}
                />
            )}
        </Box>
    );
};

const boxStyle: SxProps = {
    width: '100%',
    // backgroundColor: '#f2f2f2',
    // padding: '10px',
    color: 'rgb(68, 66, 66)',
    overflowY: 'auto'
}

export default StatusBox;