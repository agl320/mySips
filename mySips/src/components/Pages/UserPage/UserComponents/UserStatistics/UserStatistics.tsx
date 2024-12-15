interface IUserStatisticsProps {
    userId: string;
    name: string;
    value: string;
}

function UserStatistics(props: IUserStatisticsProps) {
    const { userId, name, value } = props;

    return (
        <div className="flex gap-4">
            <div>
                <h1 className="pb-4 opacity-50   text-base">{name}</h1>
                <p className="text-3xl  font-semibold">{value}</p>
            </div>
        </div>
    );
}

export default UserStatistics;
