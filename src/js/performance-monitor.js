// Performance Monitoring and Optimization Script
// Provides insights into website performance metrics

class PerformanceMonitor {
    constructor() {
        this.metrics = {};
        this.observers = [];
        this.startTime = performance.now();
        this.analytics = {
            visitData: {},
            sessionData: {},
            performanceData: {}
        };
        this.initializeAnalytics();
    }

    // Initialize analytics tracking
    initializeAnalytics() {
        this.trackPageVisit();
        this.trackUserSession();
        this.trackNavigationTiming();
        this.trackUserBehavior();
    }

    // Track page visit analytics
    trackPageVisit() {
        const now = new Date();
        const today = now.toDateString();
        
        // Get or initialize visit data
        let visitData = JSON.parse(localStorage.getItem('sulak_visit_analytics') || '{}');
        
        if (!visitData[today]) {
            visitData[today] = {
                visits: 0,
                uniqueVisitors: new Set(),
                totalTimeSpent: 0,
                bounceRate: 0,
                sections: {},
                devices: {},
                browsers: {},
                referrers: {}
            };
        }

        // Track unique visitor
        const visitorId = this.getVisitorId();
        visitData[today].uniqueVisitors = new Set([...visitData[today].uniqueVisitors, visitorId]);
        visitData[today].visits++;

        // Track device and browser info
        const deviceInfo = this.getDeviceInfo();
        visitData[today].devices[deviceInfo.type] = (visitData[today].devices[deviceInfo.type] || 0) + 1;
        visitData[today].browsers[deviceInfo.browser] = (visitData[today].browsers[deviceInfo.browser] || 0) + 1;

        // Track referrer
        const referrer = document.referrer || 'direct';
        const referrerDomain = referrer === 'direct' ? 'direct' : new URL(referrer).hostname;
        visitData[today].referrers[referrerDomain] = (visitData[today].referrers[referrerDomain] || 0) + 1;

        this.analytics.visitData = visitData;
        this.saveAnalytics();

        console.log(`Visit tracked: ${visitData[today].visits} visits today from ${visitData[today].uniqueVisitors.size} unique visitors`);
    }

    // Track user session data
    trackUserSession() {
        const sessionId = this.getSessionId();
        const sessionData = {
            id: sessionId,
            startTime: this.startTime,
            sections: [],
            interactions: 0,
            scrollDepth: 0,
            timeSpent: 0
        };

        this.analytics.sessionData = sessionData;

        // Track session duration
        window.addEventListener('beforeunload', () => {
            sessionData.timeSpent = performance.now() - this.startTime;
            this.updateSessionAnalytics(sessionData);
        });

        // Track scroll depth
        let maxScroll = 0;
        window.addEventListener('scroll', () => {
            const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            maxScroll = Math.max(maxScroll, scrollPercent);
            sessionData.scrollDepth = Math.round(maxScroll);
        }, { passive: true });
    }

    // Track navigation timing
    trackNavigationTiming() {
        window.addEventListener('load', () => {
            const nav = performance.getEntriesByType('navigation')[0];
            if (nav) {
                this.analytics.performanceData = {
                    dnsLookup: nav.domainLookupEnd - nav.domainLookupStart,
                    tcpConnect: nav.connectEnd - nav.connectStart,
                    serverResponse: nav.responseEnd - nav.requestStart,
                    domProcessing: nav.domContentLoadedEventEnd - nav.responseEnd,
                    pageLoad: nav.loadEventEnd - nav.navigationStart,
                    timestamp: Date.now()
                };

                console.log('Navigation Timing:', this.analytics.performanceData);
            }
        });
    }

    // Track user behavior and interactions
    trackUserBehavior() {
        // Track clicks
        document.addEventListener('click', (e) => {
            this.analytics.sessionData.interactions++;
            
            // Track specific elements
            if (e.target.tagName === 'A') {
                this.trackLinkClick(e.target);
            }
        });

        // Track section views
        document.addEventListener('sectionLoaded', (event) => {
            const sectionName = event.detail.section;
            this.analytics.sessionData.sections.push({
                name: sectionName,
                timestamp: performance.now(),
                loadTime: event.detail.loadTime || 0
            });

            this.trackSectionAnalytics(sectionName);
        });
    }

    // Track link clicks
    trackLinkClick(link) {
        const href = link.href;
        const text = link.textContent.trim();
        const isExternal = href.includes('http') && !href.includes(window.location.hostname);
        
        console.log(`Link clicked: ${text} (${isExternal ? 'external' : 'internal'})`);
        
        // Store link analytics
        const today = new Date().toDateString();
        let linkData = JSON.parse(localStorage.getItem('sulak_link_analytics') || '{}');
        
        if (!linkData[today]) {
            linkData[today] = { internal: {}, external: {} };
        }
        
        const category = isExternal ? 'external' : 'internal';
        linkData[today][category][href] = (linkData[today][category][href] || 0) + 1;
        
        localStorage.setItem('sulak_link_analytics', JSON.stringify(linkData));
    }

    // Track section-specific analytics
    trackSectionAnalytics(sectionName) {
        const today = new Date().toDateString();
        let sectionData = JSON.parse(localStorage.getItem('sulak_section_analytics') || '{}');
        
        if (!sectionData[today]) {
            sectionData[today] = {};
        }
        
        sectionData[today][sectionName] = (sectionData[today][sectionName] || 0) + 1;
        localStorage.setItem('sulak_section_analytics', JSON.stringify(sectionData));
        
        console.log(`Section view: ${sectionName} (${sectionData[today][sectionName]} times today)`);
    }

    // Get or create visitor ID
    getVisitorId() {
        let visitorId = localStorage.getItem('sulak_visitor_id');
        if (!visitorId) {
            visitorId = 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('sulak_visitor_id', visitorId);
        }
        return visitorId;
    }

    // Get or create session ID
    getSessionId() {
        let sessionId = sessionStorage.getItem('sulak_session_id');
        if (!sessionId) {
            sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            sessionStorage.setItem('sulak_session_id', sessionId);
        }
        return sessionId;
    }

    // Get device and browser information
    getDeviceInfo() {
        const ua = navigator.userAgent;
        let deviceType = 'desktop';
        let browser = 'unknown';

        // Detect device type
        if (/Mobi|Android/i.test(ua)) deviceType = 'mobile';
        else if (/Tablet|iPad/i.test(ua)) deviceType = 'tablet';

        // Detect browser
        if (ua.includes('Chrome')) browser = 'Chrome';
        else if (ua.includes('Firefox')) browser = 'Firefox';
        else if (ua.includes('Safari')) browser = 'Safari';
        else if (ua.includes('Edge')) browser = 'Edge';

        return { type: deviceType, browser };
    }

    // Update session analytics on page unload
    updateSessionAnalytics(sessionData) {
        const today = new Date().toDateString();
        let sessionAnalytics = JSON.parse(localStorage.getItem('sulak_session_analytics') || '{}');
        
        if (!sessionAnalytics[today]) {
            sessionAnalytics[today] = {
                sessions: 0,
                totalTime: 0,
                avgScrollDepth: 0,
                avgInteractions: 0,
                sectionsViewed: {}
            };
        }

        sessionAnalytics[today].sessions++;
        sessionAnalytics[today].totalTime += sessionData.timeSpent;
        sessionAnalytics[today].avgScrollDepth = 
            (sessionAnalytics[today].avgScrollDepth + sessionData.scrollDepth) / sessionAnalytics[today].sessions;
        sessionAnalytics[today].avgInteractions = 
            (sessionAnalytics[today].avgInteractions + sessionData.interactions) / sessionAnalytics[today].sessions;

        localStorage.setItem('sulak_session_analytics', JSON.stringify(sessionAnalytics));
    }

    // Save analytics data
    saveAnalytics() {
        // Convert Set to Array for JSON serialization
        const visitDataToSave = { ...this.analytics.visitData };
        Object.keys(visitDataToSave).forEach(date => {
            if (visitDataToSave[date].uniqueVisitors instanceof Set) {
                visitDataToSave[date].uniqueVisitors = Array.from(visitDataToSave[date].uniqueVisitors);
            }
        });
        localStorage.setItem('sulak_visit_analytics', JSON.stringify(visitDataToSave));
    }

    // Generate analytics report
    generateAnalyticsReport() {
        console.group('Šulak Website Analytics Report');
        
        // Visit analytics
        const visitData = JSON.parse(localStorage.getItem('sulak_visit_analytics') || '{}');
        const linkData = JSON.parse(localStorage.getItem('sulak_link_analytics') || '{}');
        const sectionData = JSON.parse(localStorage.getItem('sulak_section_analytics') || '{}');
        const sessionData = JSON.parse(localStorage.getItem('sulak_session_analytics') || '{}');

        const today = new Date().toDateString();
        
        if (visitData[today]) {
            console.log('Today\'s Visits:', {
                totalVisits: visitData[today].visits,
                uniqueVisitors: Array.isArray(visitData[today].uniqueVisitors) 
                    ? visitData[today].uniqueVisitors.length 
                    : visitData[today].uniqueVisitors.size,
                devices: visitData[today].devices,
                browsers: visitData[today].browsers,
                referrers: visitData[today].referrers
            });
        }

        if (sectionData[today]) {
            console.log('Popular Sections:', sectionData[today]);
        }

        if (linkData[today]) {
            console.log('Link Clicks:', linkData[today]);
        }

        if (sessionData[today]) {
            console.log('Session Stats:', {
                sessions: sessionData[today].sessions,
                avgTimeSpent: Math.round(sessionData[today].totalTime / sessionData[today].sessions / 1000) + 's',
                avgScrollDepth: Math.round(sessionData[today].avgScrollDepth) + '%',
                avgInteractions: Math.round(sessionData[today].avgInteractions)
            });
        }

        console.groupEnd();
    }

    // Measure Core Web Vitals
    measureCoreWebVitals() {
        // First Contentful Paint (FCP)
        if ('PerformanceObserver' in window) {
            const fcpObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    if (entry.name === 'first-contentful-paint') {
                        this.metrics.fcp = entry.startTime;
                        console.log(`First Contentful Paint: ${entry.startTime.toFixed(2)}ms`);
                    }
                });
            });
            fcpObserver.observe({ entryTypes: ['paint'] });
            this.observers.push(fcpObserver);

            // Largest Contentful Paint (LCP)
            const lcpObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                this.metrics.lcp = lastEntry.startTime;
                console.log(`Largest Contentful Paint: ${lastEntry.startTime.toFixed(2)}ms`);
            });
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
            this.observers.push(lcpObserver);

            // Cumulative Layout Shift (CLS) - with throttling
            let clsValue = 0;
            let lastClsReport = 0;
            let clsReportCount = 0;
            const maxClsReports = 5; // Limit to 5 reports total
            const clsThrottleDelay = 2000; // Only report every 2 seconds

            const clsObserver = new PerformanceObserver((list) => {
                const now = Date.now();
                
                for (const entry of list.getEntries()) {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                    }
                }
                
                this.metrics.cls = clsValue;
                
                // Only log if enough time has passed and we haven't exceeded max reports
                if (now - lastClsReport > clsThrottleDelay && clsReportCount < maxClsReports) {
                    console.log(`Cumulative Layout Shift: ${clsValue.toFixed(4)}`);
                    lastClsReport = now;
                    clsReportCount++;
                    
                    // Stop observing after max reports to prevent spam
                    if (clsReportCount >= maxClsReports) {
                        console.log(`CLS monitoring complete (final value: ${clsValue.toFixed(4)})`);
                        clsObserver.disconnect();
                    }
                }
            });
            clsObserver.observe({ entryTypes: ['layout-shift'] });
            this.observers.push(clsObserver);
        }
    }

    // Monitor resource loading
    monitorResourceLoading() {
        window.addEventListener('load', () => {
            const loadTime = performance.now() - this.startTime;
            this.metrics.totalLoadTime = loadTime;
            console.log(`Total Load Time: ${loadTime.toFixed(2)}ms`);

            // Resource timing analysis
            const resources = performance.getEntriesByType('resource');
            const resourceStats = {
                css: [],
                js: [],
                images: [],
                other: []
            };

            resources.forEach(resource => {
                const type = this.getResourceType(resource.name);
                const timing = {
                    name: resource.name,
                    duration: resource.duration,
                    size: resource.transferSize
                };
                resourceStats[type].push(timing);
            });

            console.group('Resource Loading Analysis');
            Object.entries(resourceStats).forEach(([type, resources]) => {
                if (resources.length > 0) {
                    const totalTime = resources.reduce((sum, r) => sum + r.duration, 0);
                    const totalSize = resources.reduce((sum, r) => sum + (r.size || 0), 0);
                    console.log(`${type.toUpperCase()}: ${resources.length} files, ${totalTime.toFixed(2)}ms total, ${this.formatBytes(totalSize)}`);
                }
            });
            console.groupEnd();
        });
    }

    // Monitor memory usage
    monitorMemoryUsage() {
        if ('memory' in performance) {
            const memory = performance.memory;
            this.metrics.memory = {
                used: memory.usedJSHeapSize,
                total: memory.totalJSHeapSize,
                limit: memory.jsHeapSizeLimit
            };
            
            console.log(`Memory Usage: ${this.formatBytes(memory.usedJSHeapSize)} / ${this.formatBytes(memory.totalJSHeapSize)}`);
        }
    }

    // Monitor section loading performance
    monitorSectionLoading() {
        document.addEventListener('sectionLoaded', (event) => {
            const sectionName = event.detail.section;
            const loadTime = performance.now() - this.startTime;
            console.log(`Section loaded: ${sectionName} at ${loadTime.toFixed(2)}ms`);
        });
    }

    // Get resource type from URL
    getResourceType(url) {
        if (url.includes('.css')) return 'css';
        if (url.includes('.js')) return 'js';
        if (url.match(/\.(png|jpg|jpeg|gif|svg|webp|ico)$/i)) return 'images';
        return 'other';
    }

    // Format bytes to human readable
    formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // Generate performance report
    generateReport() {
        setTimeout(() => {
            console.group('Šulak Website Performance Report');
            console.log('Metrics collected:', this.metrics);
            
            // Performance score calculation
            let score = 100;
            if (this.metrics.fcp > 2000) score -= 20;
            if (this.metrics.lcp > 2500) score -= 25;
            if (this.metrics.cls > 0.1) score -= 15;
            if (this.metrics.totalLoadTime > 3000) score -= 20;
            
            const grade = score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : score >= 60 ? 'D' : 'F';
            console.log(`Performance Score: ${score}/100 (Grade: ${grade})`);
            
            // Recommendations
            const recommendations = [];
            if (this.metrics.fcp > 2000) recommendations.push('Optimize CSS delivery for faster FCP');
            if (this.metrics.lcp > 2500) recommendations.push('Optimize largest content element (images, fonts)');
            if (this.metrics.cls > 0.1) recommendations.push('Improve layout stability');
            if (this.metrics.totalLoadTime > 3000) recommendations.push('Reduce total page load time');
            
            if (recommendations.length > 0) {
                console.log('Recommendations:');
                recommendations.forEach(rec => console.log(`  • ${rec}`));
            } else {
                console.log('All performance metrics look good!');
            }
            
            console.groupEnd();

            // Generate analytics report
            this.generateAnalyticsReport();
        }, 3000); // Wait 3 seconds for all metrics to be collected
    }

    // Initialize monitoring
    init() {
        console.log('Performance monitoring initialized for Šulak website');
        this.measureCoreWebVitals();
        this.monitorResourceLoading();
        this.monitorMemoryUsage();
        this.monitorSectionLoading();
        this.generateReport();
    }

    // Export analytics data
    exportAnalytics() {
        const analyticsData = {
            visits: JSON.parse(localStorage.getItem('sulak_visit_analytics') || '{}'),
            links: JSON.parse(localStorage.getItem('sulak_link_analytics') || '{}'),
            sections: JSON.parse(localStorage.getItem('sulak_section_analytics') || '{}'),
            sessions: JSON.parse(localStorage.getItem('sulak_session_analytics') || '{}'),
            performance: this.analytics.performanceData,
            exportDate: new Date().toISOString()
        };

        const dataStr = JSON.stringify(analyticsData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `sulak-analytics-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
        console.log('Analytics data exported');
    }

    // Clear analytics data
    clearAnalytics() {
        if (confirm('Are you sure you want to clear all analytics data?')) {
            localStorage.removeItem('sulak_visit_analytics');
            localStorage.removeItem('sulak_link_analytics');
            localStorage.removeItem('sulak_section_analytics');
            localStorage.removeItem('sulak_session_analytics');
            console.log('Analytics data cleared');
        }
    }

    // Get analytics summary for dashboard
    getAnalyticsSummary() {
        const visitData = JSON.parse(localStorage.getItem('sulak_visit_analytics') || '{}');
        const sessionData = JSON.parse(localStorage.getItem('sulak_session_analytics') || '{}');
        
        const dates = Object.keys(visitData).sort();
        const last7Days = dates.slice(-7);
        
        const summary = {
            totalVisits: 0,
            totalUniqueVisitors: new Set(),
            totalSessions: 0,
            avgSessionTime: 0,
            topSections: {},
            deviceBreakdown: { mobile: 0, desktop: 0, tablet: 0 },
            browserBreakdown: {},
            last7Days: last7Days.map(date => ({
                date,
                visits: visitData[date]?.visits || 0,
                uniqueVisitors: Array.isArray(visitData[date]?.uniqueVisitors) 
                    ? visitData[date].uniqueVisitors.length 
                    : visitData[date]?.uniqueVisitors?.size || 0
            }))
        };

        // Calculate totals
        dates.forEach(date => {
            const dayData = visitData[date];
            if (dayData) {
                summary.totalVisits += dayData.visits;
                
                // Add unique visitors
                const visitors = Array.isArray(dayData.uniqueVisitors) 
                    ? dayData.uniqueVisitors 
                    : Array.from(dayData.uniqueVisitors || []);
                visitors.forEach(visitor => summary.totalUniqueVisitors.add(visitor));
                
                // Device breakdown
                Object.entries(dayData.devices || {}).forEach(([device, count]) => {
                    summary.deviceBreakdown[device] = (summary.deviceBreakdown[device] || 0) + count;
                });
                
                // Browser breakdown
                Object.entries(dayData.browsers || {}).forEach(([browser, count]) => {
                    summary.browserBreakdown[browser] = (summary.browserBreakdown[browser] || 0) + count;
                });
            }
            
            if (sessionData[date]) {
                summary.totalSessions += sessionData[date].sessions;
                summary.avgSessionTime += sessionData[date].totalTime || 0;
            }
        });

        summary.totalUniqueVisitors = summary.totalUniqueVisitors.size;
        summary.avgSessionTime = summary.totalSessions > 0 
            ? Math.round(summary.avgSessionTime / summary.totalSessions / 1000) 
            : 0;

        return summary;
    }

    // Cleanup observers
    cleanup() {
        this.observers.forEach(observer => observer.disconnect());
    }
}

// Initialize performance monitoring if not in production
if (window.location.hostname === 'localhost' || window.location.hostname.includes('127.0.0.1')) {
    const perfMonitor = new PerformanceMonitor();
    perfMonitor.init();
    
    // Make available globally for debugging and analytics
    window.perfMonitor = perfMonitor;
    window.sulakAnalytics = {
        export: () => perfMonitor.exportAnalytics(),
        clear: () => perfMonitor.clearAnalytics(),
        summary: () => perfMonitor.getAnalyticsSummary(),
        report: () => perfMonitor.generateAnalyticsReport()
    };
    
    // Log available analytics commands
    console.log('Analytics commands available:');
    console.log('  • sulakAnalytics.summary() - Get analytics summary');
    console.log('  • sulakAnalytics.report() - Generate detailed report');
    console.log('  • sulakAnalytics.export() - Export analytics data');
    console.log('  • sulakAnalytics.clear() - Clear all analytics data');
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        perfMonitor.cleanup();
    });
}
