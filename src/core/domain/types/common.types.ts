// ============================================================
// MODELOS COMUNES — generados desde swagger.json
// ============================================================

export interface Result {
  succeeded?: boolean;
  errors?: string[];
}

export interface BaseEntity {
  id?: number;
  domainEvents?: BaseEvent[];
}

export interface BaseEvent {
}

