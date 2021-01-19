import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store/store';
import { getEmployees } from '../../store/reducers/employeesSlice';

import EmployeeCard from '../EmployeeCard/EmployeeCard';
import Spinner from '../Spinner/Spinner';
import { IEmployee, IState } from '../../models/types';
import './Dashboard.css';

const Dashboard: React.FC = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const employees: IEmployee[] = useSelector((state: IState) => state.employees.employeesList);
    const loading: boolean = useSelector((state: IState) => state.employees.request.loading);

    useEffect(() => {
        dispatch(getEmployees(''));
    }, [dispatch]);

    return (
        <div className='pannel-wrapper'>
            {loading ? <Spinner /> : null}
            <div className='pannel-header'>
                <h3>Dashboard</h3>
            </div>
            {employees.length > 0 ?
                <div className='pannel-content'>
                    {employees.map((employee) => {
                        return <EmployeeCard key={employee.id} employee={employee} />
                    })}
                </div> : null
            }
        </div>
    );
}

export default Dashboard;