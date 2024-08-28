import React, { useState } from "react";
import { channelList } from "../config";

export default function CalculateForm() {
  const [price, setPrice] = useState(0);
  const [subscribers, setSubscribers] = useState(0);
  const [channelInfo, setChannelInfo] = useState(null);

  const getMembersCount = async (channelId, channel) => {
    const response = await fetch(
      `https://api.telegram.org/bot${process.env.REACT_APP_BOT_TOKEN}/getChatMembersCount?chat_id=${channelId}`
    ).then((response) => response.json());

    setSubscribers(response.result);
    setPrice(response.result * 2.5);
    setChannelInfo(channel);
  };

  const handleChange = (event) => {
    const selectedChannel = channelList[event.target.value];
    if (selectedChannel) {
      getMembersCount(selectedChannel.channelId, selectedChannel);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>CalculateForm</h1>
      <form>
        <label style={{ display: "block", marginBottom: "10px" }}>
          <p>Choose the channel</p>
          <select
            onChange={handleChange}
            style={{
              padding: "10px",
              width: "100%",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          >
            <option value="">Select a channel</option>
            {Object.values(channelList).map((channel) => (
              <option key={channel.id} value={channel.id}>
                {channel.name}
              </option>
            ))}
          </select>
        </label>
      </form>
      {channelInfo && (
        <div style={{ marginTop: "20px" }}>
          <p>
            <strong>Channel URL:</strong>{" "}
            <a href={channelInfo.url} target="_blank" rel="noopener noreferrer">
              {channelInfo.url}
            </a>
          </p>
          <p>
            <strong>Subscribers:</strong> {subscribers}
          </p>
          <p>
            <strong>Price:</strong> {Math.ceil(price / 1000) * 1000}
          </p>
        </div>
      )}
    </div>
  );
}
