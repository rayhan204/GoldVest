import Card from "../ui/Card";

const PortfolioSummary = ({ portfolio }) => {
    return (
        <Card>

            <h2 className="mb-6 text-xl font-bold">

                Portfolio Summary

            </h2>

            <div className="grid grid-cols-2 gap-6">

                <div>

                    <p className="text-sm text-slate-500">

                        Gold Owned

                    </p>

                    <h2 className="mt-2 text-3xl font-bold">

                        {portfolio?.totalGram ?? 0} gram

                    </h2>

                </div>

                <div>

                    <p className="text-sm text-slate-500">

                        Average Buy

                    </p>

                    <h2 className="mt-2 text-3xl font-bold">

                        Rp{" "}

                        {Number(
                            portfolio?.averageBuyPrice ?? 0
                        ).toLocaleString("id-ID")}

                    </h2>

                </div>

            </div>

        </Card>
    );
};

export default PortfolioSummary;