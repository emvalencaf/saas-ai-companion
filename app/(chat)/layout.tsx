// interfaces
export interface IChatLayoutProps {
    params: {
        chatId: string,
    },
    children: React.ReactNode;
}

const ChatLayout: React.FC<IChatLayoutProps> = ({ params, children, }) => {
    return (
        <div className="mx-auto max-w-4xl h-full w-full">
            {children}
        </div>
    );
};

export default ChatLayout;
