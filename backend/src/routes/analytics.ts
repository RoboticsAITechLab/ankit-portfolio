import { Router, Request, Response, NextFunction } from "express";
import { pool } from "../database/index.js";
import { authenticateUser, requireRole } from "../auth/index.js";

export const analyticsRouter = Router();

// POST /api/v1/analytics/track (Public event logging)
analyticsRouter.post("/track", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { event_type, path, referrer, metadata } = req.body;
    if (!event_type || !path) {
      res.status(400).json({ success: false, message: "Missing event_type or path" });
      return;
    }

    const userAgent = req.headers["user-agent"] || null;

    await pool.query(
      `INSERT INTO analytics (event_type, path, referrer, user_agent, metadata)
       VALUES ($1, $2, $3, $4, $5)`,
      [event_type, path, referrer || null, userAgent, JSON.stringify(metadata || {})]
    );

    res.status(200).json({ success: true, message: "Event tracked" });
  } catch (error) {
    next(error);
  }
});


// GET /api/v1/analytics (Admin summary)
analyticsRouter.get(
  "/",
  authenticateUser,
  requireRole(["admin"]),
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const pageViewsQuery = await pool.query(
        "SELECT COUNT(*) as total_views FROM analytics WHERE event_type = 'page_view'"
      );
      const uniqueVisitorsQuery = await pool.query(
        "SELECT COUNT(DISTINCT user_agent) as total_visitors FROM analytics"
      );
      const topPagesQuery = await pool.query(
        `SELECT path, COUNT(*) as views 
         FROM analytics 
         GROUP BY path 
         ORDER BY views DESC 
         LIMIT 10`
      );

      res.status(200).json({
        success: true,
        data: {
          total_views: parseInt(pageViewsQuery.rows[0].total_views, 10),
          total_visitors: parseInt(uniqueVisitorsQuery.rows[0].total_visitors, 10),
          top_pages: topPagesQuery.rows,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);
