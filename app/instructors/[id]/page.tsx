import { Instructor } from "@/app/lib/definitions";
import styles from '../instructor.module.css';
async function getIntructor(id:string) {
    const response = await fetch(
        `http://127.0.0.1:8090/api/collections/instructors/records/${id}`,
         {next: {revalidate: 10 }}
    );
    const data = await response.json();
    return await data as Instructor;
}

export default async function InstructorPage({ params }: any) {
    const instructor = await getIntructor(params.id);
    return (
        <div>
            <h1>Instructor/{instructor.id}</h1>
            <div className={styles.instructor}>
                <h1>{instructor.name}</h1>
                <p>{instructor.discipline}</p>
                <p>{instructor.price_per_hour}</p>
            </div>
        </div>
    );
}