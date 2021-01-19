import React from 'react';
import { IEmployee } from '../../models/types';
import './EmployeeCard.css';

interface EmployeeCardProps {
    employee: IEmployee;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({employee}) => {
    return (
        <div className='employee-box'>
            <div>{employee.name}</div>
            <div>{employee.email}</div>
            <div>{employee.address.street}</div>
            <div>{employee.address.suite}</div>
            <div>{employee.address.city}</div>
            <div>{employee.phone}</div>
        </div>
    );
}

export default EmployeeCard;
