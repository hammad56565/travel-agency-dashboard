import clsx from "clsx";
import { calculateTrendPercentage } from "~/lib/utils"

const StatsCard = ({
    headerTitle,
    total,
    lastMonthCount,
    currentMonthCount
}: StatsCard) => {
    const { trend, percentage } = calculateTrendPercentage(currentMonthCount, lastMonthCount)
    const isDecrement = trend === 'decrement';

    return (
        <article className="stats-card">
            <h3 className="text-base font-medium">
                {headerTitle}
            </h3>
            <div className="content">
                <div className="flex item-center gap-2 flex-col">
                    <h2 className="text-4xl font-semibold">
                        {total}
                    </h2>

                    <div className="flex items-center gap-2 ">
                        <figure className="flex items-center gap-1">
                            <img src={`/assets/icons/${isDecrement ? 'arrow-down-red.svg' : 'arrow-up-green.svg'}`} alt="arrow" className="size-5" />
                            <figcaption className={clsx('text-sm font-medium',
                                isDecrement ? 'text-red-500' : 'text-green-700')}>{Math.round(percentage)}%</figcaption>
                        </figure>
                        <p className="text-sm font-medium text-gray-600 truncate">vs last month</p>
                    </div>
                </div>
                <img src={`/assets/icons/${isDecrement ? 'decrement.svg' : 'increment.svg'}`} alt="trend-graph" className="xl:w-32 w-full  h-full xl:h-full md:h-32" />
            </div>
        </article>
    )
}

export default StatsCard
