import { Divider, Typography } from "antd";

/**
 * Creates a page with a title, description, and optional divider. Any children will be placed below.
 * @param {Object} props Props object, which is destructured.
 * @param {string} props.title The title.
 * @param {string} props.description The description.
 * @param {boolean} [props.divider=true] Add a divider below description. Defaults to true.
 */
const Page = ({ title, description, divider = true, children }) => {
    return (
        <>
            <Typography.Title underline>{title}</Typography.Title>
            <Typography.Title level={4}>{description}</Typography.Title>
            {divider && <Divider />}
            {children}
        </>
    );
};

export default Page;