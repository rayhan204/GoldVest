import Card from "../ui/Card";

const GoldPriceCard = ({ data }) => {
    return (
        <Card>

            <h2 className="mb-6 text-xl font-bold">

                Current Gold Price

            </h2>

            <div className="space-y-5">

                <div>

                    <p className="text-sm text-gray-500">

                        Buy Price

                    </p>

                    <h2 className="text-3xl font-bold text-yellow-500">

                        Rp{" "}

                        {Number(
                            data.buyPrice
                        ).toLocaleString("id-ID")}

                    </h2>

                </div>

                <div>

                    <p className="text-sm text-gray-500">

                        Sell Price

                    </p>

                    <h2 className="text-3xl font-bold text-emerald-500">

                        Rp{" "}

                        {Number(
                            data.sellPrice
                        ).toLocaleString("id-ID")}

                    </h2>

                </div>

            </div>

        </Card>
    );
};

export default GoldPriceCard;