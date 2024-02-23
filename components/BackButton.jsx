import Link from "next/link";

export default function BackButton({label="", url=""}){
    const backButtonStyle = {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '10px 20px',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '16px',
        margin: '4px 2px',
        cursor: 'pointer',
        borderRadius: '5px',
    };
    return (
        <Link href={url}>
            <div style={backButtonStyle}>{label}</div>
        </Link>
    )
}