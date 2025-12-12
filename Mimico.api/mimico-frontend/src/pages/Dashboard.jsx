function Dashboard(){
    const token = localStorage.getItem("token");

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Your token:</p>
            <small>{token}</small>
        </div>
    );
}
export default Dashboard;