import React, { Dispatch, SetStateAction, useState } from 'react';
import { Box, 
        TextField, 
        NativeSelect, 
        InputLabel, 
        Button 
} from '@mui/material';

import { TaskProps } from './TaskCard';

interface Props {
    doneTask: Array<TaskProps>;
    setDoneTask: Dispatch<SetStateAction<TaskProps[]>>;
    openTask: Array<TaskProps>;
    setOpenTask: Dispatch<SetStateAction<TaskProps[]>>;
    progressTask: Array<TaskProps>;
    setProgressTask: Dispatch<SetStateAction<TaskProps[]>>;
    toggleModal: () => void;
}

const CreateTaskForm: React.FC<Props> = ({
    doneTask,
    setDoneTask,
    openTask,
    setOpenTask,
    progressTask,
    setProgressTask,
    toggleModal
}) => {

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [status, setStatus] = useState<string>('Open');

    const handleSubmitClick = () => {
        if(title==='' || description==='' || status===''){
            alert('Please fill all the fields');
            return;
        }
        let task = {
            id: new Date().getTime(),
            title,
            description,
            status
        }
        if(status === 'Open'){
            setOpenTask([task, ...openTask]);
        }else if(status === 'In Progress'){
            setProgressTask([task, ...progressTask]);
        }else if(status === 'Done'){
            setDoneTask([task, ...doneTask])
        }
        toggleModal();
    }

    return (
        <>
            <Box sx={modalBoxStyle}>
                <h3>Create New Task</h3>
                <form>
                    <TextField
                        fullWidth
                        id="standard-basic"
                        label="Title"
                        variant="standard"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <br /><br /><br />
                    <TextField
                        id="outlined-textarea"
                        label="Description"
                        multiline
                        fullWidth
                        rows={3}
                        variant="filled"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <br /><br /><br />
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Status
                    </InputLabel>
                    <NativeSelect
                        defaultValue={'Open'}
                        inputProps={{
                            name: 'Status',
                            id: 'uncontrolled-native',
                        }}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value={'Open'}>Open</option>
                        <option value={`In Progress`}>In Progress</option>
                        <option value={'Done'}>Done</option>
                    </NativeSelect>
                    <br /><br />
                    <Button
                        style={{ float: 'right', marginLeft: '10px' }}
                        variant="contained"
                        onClick={handleSubmitClick}
                    >
                        Submit
                    </Button>
                    <Button
                        style={{ float: 'right' }}
                        variant="contained"
                        onClick={toggleModal}
                    >
                        Close
                    </Button>
                </form>
            </Box>
        </>
    );
};

const modalBoxStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    color: 'rgb(68, 66, 66)'
};

export default CreateTaskForm;