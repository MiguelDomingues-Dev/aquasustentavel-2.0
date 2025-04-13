import React from "react";
import { Box, Typography, Card, CardContent, ToggleButton, ToggleButtonGroup } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import Button from "../../components/button/Button"; // seu botão customizado

const plans = [
  {
    title: "Free",
    price: "0",
    features: ["1 usuário 1 calendário conectado", "Até 12 respostas"],
    buttonLabel: "Grátis",
    style: {
      border: "1px solid #00B21B",
      background: "#033820",
      color: "#fff"
    }
  },
  {
    title: "Aqua-Plus",
    price: "15",
    features: [
      "Acesso a suporte preferencial",
      "Download em PDF relatórios semanais",
      "Armazenamento de 500GB"
    ],
    buttonLabel: "Obter Pacote",
    buttonStyle:{
      background: "#fff",
      color: "#000",
    },
    highlight: true,
    style: {
      background: "#00B21B",
      color: "white",
      boxShadow: "0 0 25px rgba(34, 197, 94, 0.6)"
    }
  },
  {
    title: "Aqua-Plus-Ultra",
    price: "35",
    features: [
      "1 usuário 1 calendário conectado",
      "Até 12 respostas",
      "Até 12 meses de histórico"
    ],
    buttonLabel: "Obter Pacote",
    style: {
      border: "1px solid #00B21B",
      background: "#033820",
      color: "#FFF"
    }
  }
];

export default function PricingSection() {
  const [billing, setBilling] = React.useState("monthly");

  const handleBillingChange = (event, newValue) => {
    if (newValue !== null) setBilling(newValue);
  };

  return (
    <Box sx={{ bgcolor: "#06131a", color: "white", py: 8, textAlign: "center", marginTop: "12.5rem"}}>
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Temos planos personalizáveis incríveis
      </Typography>
      <Typography variant="body1" sx={{ maxWidth: 700, mx: "auto", mb: 6, color: "#cbd5e1" }}>
        Com nossos pacotes escaláveis, você pode pagar pelo que precisa e deixar de fora o que não precisa. Nós cresceremos com você. <br />
        <strong style={{ color: "white" }}>Aproveite a melhor oferta para você</strong>
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 4 }}>
        {plans.map((plan) => (
          <Card
            key={plan.title}
            sx={{
              width: 280,
              p: 3,
              borderRadius: 3,
              textAlign: "left",
              ...plan.style,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              textAlign: 'center',
              height: '100%'
            }}
          >
            <CardContent sx={{ width: '100%' }}>
              <Box sx={{ mb:2 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom sx={{ color: plan.highlight ? "white" : plan.style.color }}>
                  {plan.title}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h4" fontWeight={700}>
                  R$ {plan.price} <Typography component="span" variant="body1">/m</Typography>
                </Typography>
              </Box>

              {plan.highlight && (
                <ToggleButtonGroup
                  value={billing}
                  exclusive
                  onChange={handleBillingChange}
                  sx={{ mt: 2, mb: 2, display: 'flex', justifyContent: 'center' }}
                >
                  <ToggleButton value="monthly" sx={{
                      color: 'white',
                      borderColor: 'white',
                      bgcolor: '#081623',
                      mb: 2,
                      px: 3,
                      py: 1.5,
                      fontWeight: 'bold',
                      borderRadius: '8px',
                      '&.Mui-selected': {
                        bgcolor: '#003127',
                        color: '#fff',
                        borderColor: '#00B21B'
                      },
                      '&:hover': {
                        bgcolor: '#003127',
                      }
                    }}>
                      Monthly
                      </ToggleButton>
                  <ToggleButton value="annually" sx={{
                      color: 'white',
                      borderColor: 'white',
                      bgcolor: '#081623',
                      mb: 2,
                      px: 3,
                      py: 1.5,
                      fontWeight: 'bold',
                      borderRadius: '8px',
                      '&.Mui-selected': {
                        bgcolor: '#003127',
                        color: '#fff',
                        borderColor: '#00B21B'
                      },
                      '&:hover': {
                        bgcolor: '#003127',
                      }
                    }}>Annually</ToggleButton>
                </ToggleButtonGroup>
              )}

              <Box component="ul" sx={{ pl: 2, mb: 2, color: plan.highlight ? "white" : "#cbd5e1" }}>
                {plan.features.map((feature, idx) => (
                  <li key={idx} style={{ marginBottom: 8 }}>
                    <CheckIcon sx={{ fontSize: 16, mr: 1, verticalAlign: "middle" }} />
                    {feature}
                  </li>
                ))}
                <li>...</li>
              </Box>

              <Button style={plan.buttonStyle}>
                {plan.buttonLabel}
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
