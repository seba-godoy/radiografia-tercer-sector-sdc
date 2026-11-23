# OP · Estado de ejecución

Corte 23/11/2026. OP-1 a OP-6 revisadas en secuencia. Primer código validado por CI completo y capturas de escritorio/móvil; correcciones editoriales finales con nueva comprobación en curso.

| Fase | Decisión / corrección | Persistencia |
| --- | --- | --- |
| OP-1 | 31 revisados;14 entradas/17 fuera; sin umbral ni suma de índices | op1-triaje-31-v1.json |
| OP-2 | Siete tareas; separar comunicación de contactos y añadir traspaso | op2-fichas-v1.json |
| OP-3 | Rúbrica IPH y tres calibraciones; frecuencia y persistencia separadas | op3-metodo-iph-v1.json |
| OP-4 | Aplicación a siete; FECU existente reduce valor atribuible; beneficio IA no medido | op4-evaluacion-v1.json |
| OP-5 | 21 escenarios; API sólo referencia, horas no monetizadas, TCO ND | op5-sostenibilidad-v1.json |
| OP-6 | Acuerdos primero, caja después; reserva normativa, página y MVP especificado | oportunidades-7-v1.json y OP-INFORME-v1.md |

Primer commit de implementación: b56975f1fe3277d380d288fef8da7adddd4f336b. PR #32 en borrador sobre feat/h-2-2-criticidad; no main.

El avance no construye la herramienta operativa, inicia pilotos humanos ni contrata servicios. Futuros cambios de puntaje deben conservar la comparación con las alternativas y los datos ausentes como tales.

QA del primer código: baseline run45213367808 PASS; navegador run45213367658 PASS, artefacto14836079677 revisado visualmente. Preview inicial READY/HTTP200 y SHA coincidente. El cierre de Notion/PR registra el commit definitivo; no confundir con producción.
