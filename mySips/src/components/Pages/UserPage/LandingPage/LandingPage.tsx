import LandingNav from "@/components/Landing/LandingNav";

const MarginStyles = {
    marginRight: "15vw",
    marginLeft: "15vw",
} as React.CSSProperties;

function LandingPage() {
    return (
        <div style={MarginStyles}>
            <LandingNav />
        </div>
    );
}

export default LandingPage;
