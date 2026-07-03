"use client";

import React from "react";

/**
 * Garde-fou pour la scène 3D : si React Three Fiber / WebGL échoue au rendu
 * (GPU non supporté, contexte perdu, etc.), on bascule automatiquement sur le
 * fallback (puzzle 2.5D) au lieu d'afficher une zone vide.
 */
export class SceneBoundary extends React.Component<
  { fallback: React.ReactNode; children: React.ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    // silencieux : le fallback prend le relais
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
