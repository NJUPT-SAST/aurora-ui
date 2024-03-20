const Wraper = ({ children }) => {
    return (
        <div style={{
            width: '100%',
            minHeight: '12.5em',
            border: '1px solid #e5e5e5',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            {children}
        </div>
    )
}
export default Wraper