import Link from "next/link";
import { Instructor } from "../lib/definitions";
import styles from './instructor.module.css';
import CreateInstructor from "./CreateInstructor";

async function getInstructors() {
    const response = await fetch('http://127.0.0.1:8090/api/collections/instructors/records?page=1&perPage=30', { cache: 'no-store' });
    const data = await response.json();
    return await data?.items as Instructor[];
}

export default async function Instructors() {
    const instructors = await getInstructors();
    console.log('lalla',instructors);
  return (
    <div>
      <h1>Instructors</h1>
        <div>
            {instructors?.map((instructor:Instructor) => {
                return (<Instructor key={instructor.id} {...instructor}  />);
            })}
    <CreateInstructor />    
        </div>
    </div>
  );

    function Instructor({ id, name, discipline, price_per_hour }: Instructor) {
        return (
            <div>
                <Link href={`/instructors/${id}`}>
                    <div className={styles.instructor}>
                        <h2>{name}</h2>
                        <p>{discipline}</p>
                        <p>{price_per_hour}</p>
                    </div>
                </Link>
            </div>
        );

    }
}