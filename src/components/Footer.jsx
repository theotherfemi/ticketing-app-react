export default function Footer(){
    return (
        <footer className="bg-white border-t">
            <div className="max-w-[1440px] mx-auto px-4 py-6 text-sm text-slate-500 flex justify-between">
                <div>© {new Date().getFullYear()} TicketPro</div>
                <div>Built with React by Olufemi</div>
            </div>
        </footer>
    )
}