'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateInstructor() {
    const [name, setName] = useState('');
    const [discipline, setDiscipline] = useState('');
    const [price_per_hour, setPricePerHour] = useState('');
    
    const router = useRouter();

    async function create(e: any) {
        e.preventDefault();
        const response = await fetch('http://127.0.0.1:8090/api/collections/instructors/records', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, discipline, price_per_hour }),
        });
        setName('');
        setDiscipline('');
        setPricePerHour('');

        router.refresh();
    }    

    return (
        <form onSubmit={create}>
          <h3>Create a new Instructor</h3>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            placeholder="Discipline"
            type="text"
            value={discipline}
            onChange={(e) => setDiscipline(e.target.value)}
          />
          <input
            placeholder="Price per hour"
            type="text"
            value={price_per_hour}
            onChange={(e) => setPricePerHour(e.target.value)}
          />
          <button type="submit">
            Create Instructor
          </button>
        </form>
      );
}
