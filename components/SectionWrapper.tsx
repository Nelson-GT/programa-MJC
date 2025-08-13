const SectionWrapper = ({ children, ...props }) => (
    <section {...props} className={`py-0 lg:py-20 pb-0${props.className || ""}`}>
        {children}
    </section>
)

export default SectionWrapper