// interfaces
export interface IRootPageProps {
    params: {
        id: string,
    },
}

const RootPage: React.FC<IRootPageProps> = ({ params }) => {
    return (
        <div>
           Olá
        </div>
    );
};

export default RootPage;
