import Image from 'next/image';
import styles from '../../styles/Person.module.css'
import Link from 'next/link';
const PersonList = ({ data }) => {
    return (
        <div>
            <h2>Person List</h2>
            <div className={styles['person-list']}>
                {
                    data?.data?.map((person, index) => {
                        return (
                            <Link className={styles['person-card']} key={index} href={'/person/' + person?.id}>
                                <Image
                                    height={100}
                                    width={90}
                                    alt=''
                                    src={person?.avatar}
                                />
                                <h4>{person?.first_name} {person?.last_name}</h4>
                                email: <span>{person?.email}</span>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}

export async function getStaticProps() {
    // Fetch data at build time
    async function fetchStaticData() {
        try {
            // Replace this URL with the actual API endpoint you want to fetch data from
            const apiUrl = 'https://reqres.in/api/users?page=1&per_page=10';

            // Fetch data from the API
            const response = await fetch(apiUrl);
            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                // Handle errors here
                console.error('Failed to fetch data:', response.status, response.statusText);
                return null;
            }
        } catch (error) {
            // Handle network errors or other exceptions
            console.error('An error occurred:', error);
            return null;
        }
    }

    const data = await fetchStaticData();
    return {
        props: { data },
    };
}


export default PersonList