import { Card, CardBody, CardHeader, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

interface Properties {
  title: string;
  id: string;
  owner: string;
}

function ConversationCard(props: Properties) {
  const navigate = useNavigate();
  return (
    <Card onClick={(e) => navigate(`/conversation/${props.id}`)} width={400}>
      <CardBody>
        <CardHeader>
          <Heading size="md">{props.title}</Heading>
        </CardHeader>
        <Text>{props.owner}</Text>
      </CardBody>
    </Card>
  );
}

export default ConversationCard;
