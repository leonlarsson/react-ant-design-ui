import { Button, Card, Typography } from "antd";

/**
 * Creates an overview section with a card. Any children will be placed inside the card-body.
* @param {Object} props Props object, which is destructured.
 * @param {string} props.icon The Font Awesome icon classes.
 * @param {string} props.title The card title.
 * @param {Function} [props.setModalOpen] The set function to open the modal.
 * @param {string} [props.buttonText] The button text. No button will be added if this is empty.
 * @param {string} [props.buttonLink] The button link. Will turn a button into an href link.
 * @param {boolean} [props.hideCardButtons] Whether to show card buttons.
 */
const Overview = ({ icon, title, setModalOpen, buttonText, buttonLink, hideCardButtons, children }) => {

    const useIcons = true;

    return (
        <div className="col mb-3" style={{ minWidth: "334px" }}>
            <Card
                hoverable
                style={{ height: "100%", borderColor: "rgba(0, 21, 41, .2)", cursor: "default" }}
                title={<><Typography.Text style={{ fontSize: 20 }} strong>{useIcons && <i className={icon} />} {title}</Typography.Text></>}
                extra={hideCardButtons ?
                    null :
                    buttonText && buttonLink ?
                        <Button type="primary" href={buttonLink} target="_blank">{buttonText} <i className="fa-solid fa-up-right-from-square ms-1" /></Button> :
                        <Button type="primary" onClick={() => setModalOpen(true)}>{useIcons && <i className={icon + " me-1"} />}Manage</Button>
                }>
                {children}
            </Card>
        </div>
    );
};

export default Overview;