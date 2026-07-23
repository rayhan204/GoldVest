import { API_BASE_URL } from "../api/axios";

const SERVER_ORIGIN = API_BASE_URL.replace(/\/api\/?$/, "");

export const getFileUrl = (path) => {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `${SERVER_ORIGIN}/${path.replace(/\\/g, "/")}`;
};

export const formatCurrency = (value) => {
  const num = Number(value ?? 0);
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(num);
};

export const formatNumber = (value, options = {}) => {
  const num = Number(value ?? 0);
  return new Intl.NumberFormat("id-ID", options).format(num);
};

export const formatGram = (value) => {
  const num = Number(value ?? 0);
  return `${new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  }).format(num)} gr`;
};

export const formatPercent = (value) => {
  const num = Number(value ?? 0);
  const sign = num > 0 ? "+" : "";
  return `${sign}${new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num)}%`;
};

export const formatDate = (value) => {
  if (!value) return "-";
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
};

export const formatDateTime = (value) => {
  if (!value) return "-";
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
};
