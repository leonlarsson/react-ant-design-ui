import { useState } from "react";
import { Button, Card, Modal, Typography } from "antd";
import Overview from "./Shared/Overview";

const Tickets = ({ user, hide, hideCardButtons }) => {
  if (hide) return;
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Overview icon="fa-solid fa-envelope" title="Tickets" setModalOpen={setModalOpen} buttonText="View All Tickets" hideCardButtons={hideCardButtons}>
        {user.tickets.length ?
          <>
            <Typography.Title level={5}>{user.tickets.length} tickets:</Typography.Title>
            <ul>{user.tickets.slice(0, 5).map(ticket => <li key={ticket.id}>[{ticket.status}] {ticket.subject}</li>)}</ul>
          </> : <Typography.Title level={5}>No tickets</Typography.Title>
        }
        {user.tickets.length > 5 && <Typography.Title level={5} underline>And {user.tickets.length - 5} more...</Typography.Title>}
      </Overview>

      {/* MODAL */}
      <Modal
        style={{ top: 25 }}
        title={<div style={{ fontSize: 20 }}><i className="fa-solid fa-envelope" /> View All Tickets</div>}
        open={modalOpen}
        footer={<Button onClick={() => setModalOpen(false)}>Close</Button>}
        onCancel={() => setModalOpen(false)}
        onOk={() => setModalOpen(false)}
      >
        {user.tickets.length ? user.tickets.map(ticket => {
          return (
            <Card
              key={ticket.id}
              style={{ marginBottom: 20, cursor: "default" }}
              hoverable
              title={ticket.subject}
              extra={<Button href={ticket.link} icon={<i className="fa-solid fa-envelope" style={{ marginRight: 5 }} />} target="_blank">View</Button>}
            >
              <Typography.Title level={5}>ID: <code>{ticket.id}</code></Typography.Title>
              <Typography.Title level={5}>Status: <code>{ticket.status}</code></Typography.Title>
              <Typography.Title level={5}>Opened: <code>{ticket.opened.toUTCString()}</code></Typography.Title>
            </Card>
          );
        }) : <Typography.Title level={5}>No tickets</Typography.Title>}
      </Modal>
    </>
  );
};

export default Tickets;