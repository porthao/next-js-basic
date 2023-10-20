import Image from "next/image"
import styles from "../../styles/Person.module.css"
import Head from "next/head"
const PersonDetail = ({ data }) => {
    return (
        <div className={styles['person-details']}>
            <Head>
                <title>{data.data.first_name}</title>
                <meta name="description" content="Discover essential organic gardening tips for beginners and seasoned gardeners. Learn how to grow organic vegetables, flowers, and more." />
            </Head>
            <img
                width={400}
                height={450}
                alt=""
                src={data.data.avatar}
            />
            <div style={{ marginLeft: 10 }}>
                <h2>name: {data.data.first_name} {data.data.last_name}</h2>
                <div>email info: {data.data.email}</div>
                <div>support: {data.support.text}</div>
            </div>
        </div>
    )
}

export async function getServerSideProps({ params }) {
    const { id } = params
    // Fetch data at build time
    async function fetchServerSidePropData() {
        try {
            // Replace this URL with the actual API endpoint you want to fetch data from
            const apiUrl = 'https://reqres.in/api/users?id=' + id;

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

    const data = await fetchServerSidePropData();
    return {
        props: { data },
    };
}

export default PersonDetail