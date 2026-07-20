import Card from "../ui/Card";

const transactions = [
    {
        id: 1,
        type: "Buy",
        gram: "2 gram",
        amount: "Rp3.800.000",
    },
    {
        id: 2,
        type: "Sell",
        gram: "1 gram",
        amount: "Rp1.950.000",
    },
];

const RecentTransaction = () => {
    return (
        <Card>

            <h2 className="text-xl font-bold mb-5">

                Recent Transactions

            </h2>

            <table className="w-full">

                <thead>

                    <tr className="text-left border-b">

                        <th>Type</th>

                        <th>Gram</th>

                        <th>Amount</th>

                    </tr>

                </thead>

                <tbody>

                    {transactions.map((trx) => (

                        <tr
                            key={trx.id}
                            className="border-b h-14"
                        >

                            <td>{trx.type}</td>

                            <td>{trx.gram}</td>

                            <td>{trx.amount}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </Card>
    );
};

export default RecentTransaction;