import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Modal from '@mui/material/Modal';

import './App.css';
import StatusBox from './components/StatusBox';
import { TaskProps } from './components/TaskCard';
import CreateTaskForm from './components/CreateTaskForm';

const taskData = [
	{
		id: 1634608610128,
		title: 'Change HTTP response code',
		description: 'Exposure service needs to return 400 on Internal error!',
		status: 'Open'
	},
	{
		id: 1634609119836,
		title: 'Remove raven vulnerabilities',
		description: 'Upgrade packages to remove open source vulnerabilities!',
		status: 'Open'
	},
	{
		id: 1634609132346,
		title: 'Migrate maven repo to managed',
		description: 'Maven needs to consume libraries from new Managed repos!',
		status: 'In Progress'
	},
	{
		id: 1634609149897,
		title: 'Update notification message',
		description: 'OTP notification message should be clear',
		status: 'In Progress'
	},
	{
		id: 1634609162907,
		title: 'Add multiple tenants feature',
		description: 'Owner should be able to add multiple tenants in a room!',
		status: 'Done'
	}
];

function App() {

	const [allTasks, setAllTasks] = useState<Array<TaskProps>>(taskData);
	const [doneTask, setDoneTask] = useState<Array<TaskProps>>(taskData.filter(task => task.status === 'Done'));
	const [progressTask, setProgressTask] = useState<Array<TaskProps>>(taskData.filter(task => task.status === 'In Progress'));
	const [openTask, setOpenTask] = useState<Array<TaskProps>>(taskData.filter(task => task.status === 'Open'));
	const [modalOpen, setModalOpen] = useState<boolean>(false);

	const toggleModal = () => setModalOpen(!modalOpen);

	const handleDragDropMovement = (taskId: number,
		targetStatus: string) => {
			let currentTask = allTasks.filter(task => task.id === taskId);
			currentTask[0].status = targetStatus;
			let remainingTasks = allTasks.filter(task => task.id !== taskId);
			remainingTasks.push(currentTask[0]);
		setOpenTask(remainingTasks.filter(task => task.status === 'Open'));
		setProgressTask(remainingTasks.filter(task => task.status === 'In Progress'));
		setDoneTask(remainingTasks.filter(task => task.status === 'Done'));
		console.log("After drop: ", doneTask);
	}

	const handleTaskDelete = (id: number) => {
		console.log(doneTask);
		console.log(id);
		let updatedTasks = allTasks.filter(task => task.id !== id);
		setAllTasks(updatedTasks);
		setOpenTask(updatedTasks.filter(task => task.status === 'Open'));
		setProgressTask(updatedTasks.filter(task => task.status === 'In Progress'));
		setDoneTask(updatedTasks.filter(task => task.status === 'Done'));
	}

	return (
		<DndProvider backend={HTML5Backend}>
			<div className="App">
				<div className="header">
					<h1>Trello Task</h1>
					<Button 
						variant="contained" 
						onClick={toggleModal}
						style={{ background: 'rgb(40,84,204)' }}
					>
						Create Task
					</Button>
					<Modal
						open={modalOpen}
						onClose={toggleModal}
						aria-labelledby="modal-modal-title"
						aria-describedby="modal-modal-description"
					>
						<div>
							<CreateTaskForm
								doneTask={doneTask}
								setDoneTask={setDoneTask}
								openTask={openTask}
								setOpenTask={setOpenTask}
								progressTask={progressTask}
								setProgressTask={setProgressTask}
								toggleModal={toggleModal}
							/>
						</div>
					</Modal>
				</div>
				<div className="row">
					<div className="col col-1">
						<StatusBox 
							status="Open" 
							taskData={openTask}
							handleDragDropMovement={handleDragDropMovement}
							handleTaskDelete={handleTaskDelete}
						/>
					</div>
					<div className="col col-2">
						<StatusBox 
							status="In Progress" 
							taskData={progressTask} 
							handleDragDropMovement={handleDragDropMovement}
							handleTaskDelete={handleTaskDelete}
						/>
					</div>
					<div className="col col-3">
						<StatusBox 
							status="Done" 
							taskData={doneTask}
							handleDragDropMovement={handleDragDropMovement}
							handleTaskDelete={handleTaskDelete}
						/>
					</div>
				</div>
			</div>
		</DndProvider>
	);
}

export default App;
