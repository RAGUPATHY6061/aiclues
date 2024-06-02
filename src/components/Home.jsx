import React, { useState, useEffect } from 'react';
import axios from '../utlis/axiosConfig';
import { useAppContext } from '../context/UserProvider';
import { Link } from 'react-router-dom';

const Home = () => {
    const [skills, setSkills] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredSkills, setFilteredSkills] = useState([]);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const { user, setUser } = useAppContext();

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const response = await axios.get('/tables/all-skills');
                setSkills(response.data.data.skills || []);
            } catch (error) {
                console.error(error);
            }
        };

        fetchSkills();
    }, []);

    useEffect(() => {
        if (skills.length > 0) {
            setFilteredSkills(
                skills.filter(skill =>
                    skill.display_name.toLowerCase().includes(search.toLowerCase())
                    && !selectedSkills.some(selected => selected.display_name === skill.display_name)
                )
            );
        }
    }, [search, skills, selectedSkills]);

    const handleSelectSkill = (skill) => {
        const updatedSkills = Array.isArray(user.skills) ? [...user.skills, skill] : [skill];
        setUser({ ...user, skills: updatedSkills });
        setSelectedSkills(prevSelectedSkills => [...prevSelectedSkills, skill]);
        setIsSearchActive(false);
        setSearch('');
        setFilteredSkills(filteredSkills.filter(filteredSkill => filteredSkill.display_name !== skill.display_name));
    };
    


    const handleSearchClick = () => {
        setIsSearchActive(true);
    };

    // Reset selectedSkills when the component mounts
    useEffect(() => {
        setSelectedSkills([]);
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Select Skills</h2>
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search skills"
                className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full"
                onClick={handleSearchClick}
            />
            {isSearchActive && (
                <ul className="grid grid-cols-3 gap-4">
                    {filteredSkills.map((skill, index) => (
                        <li
                            key={index}
                            onClick={() => handleSelectSkill(skill)}
                            className="cursor-pointer bg-gray-100 rounded-md p-4 text-center"
                        >
                            {skill.display_name}
                        </li>
                    ))}
                </ul>
            )}
            <div className="flex justify-center mt-8">
                <Link
                    to="/user-skills"
                    className="inline-block px-6 py-3 bg-blue-500 text-white rounded-md"
                >
                    View Selected Skills
                </Link>
            </div>
        </div>
    );
};

export default Home;
