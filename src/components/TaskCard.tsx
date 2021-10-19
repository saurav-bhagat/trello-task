import React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActions } from '@mui/material';
import { SxProps } from '@mui/system';
import Icon from '@mui/material/Icon';
import { useDrag } from 'react-dnd';

import { ItemTypes } from './ItemTypes';

export interface TaskProps{
    id: number,
    title: string,
    description: string,
    status: string
}

interface TaskCardProps{
    task: TaskProps
    handleTaskDelete: (id: number) => void
}

const TaskCard: React.FC<TaskCardProps> = ({ task, handleTaskDelete }) => {

    const { id, title, description, status } = task;
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.CARD,
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
        item: {
            taskId : id,
            status
        }
    }));

    return (
        <Card
            ref={drag}
            sx={{
                ...cardStyle,
                opacity: isDragging ? 0.5 : 1,
                backgroundColor: isDragging ? '#1976d2' : 'white'
            }}
        >
            <CardContent>
                <h4>{title}<span onClick={() => handleTaskDelete(id)}>
                    {status === 'Done'? <Icon style={{ float: 'right' }} color="primary">delete</Icon>: ''}
                </span></h4>
                <p>{description}</p>
            </CardContent>
        </Card>
    );
};

const cardStyle: SxProps = {
    width: '80%',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginBottom: '20px',
    color: 'rgb(68, 66, 66)'
}

export default TaskCard;