import React from 'react';
import { useAppContext } from '../context/UserProvider';

const UserSkills = () => {
    const { user, setUser } = useAppContext();

    const handleRemoveSkill = (skillToRemove) => {
        const updatedSkills = user.skills.filter(skill => skill.display_name !== skillToRemove.display_name);
        setUser({ ...user, skills: updatedSkills });
    };
    
    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold mb-8 text-center">User Skills</h2>
            {user.skills && user.skills.length > 0 ? (
                <ul className="grid grid-cols-3 gap-4">
                    {user.skills.map((skill, index) => (
                        <li key={index} className="flex items-center justify-between bg-gray-100 rounded-md p-4">
                            <span>{skill.display_name}</span>
                            <button onClick={() => handleRemoveSkill(skill)} className="ml-2 text-red-500">
                                <span>&#10005;</span>
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center">No user skills found.</p>
            )}
        </div>
    );
};

export default UserSkills;
