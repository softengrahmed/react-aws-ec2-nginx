#!/bin/bash
# ========================================================================================
# ADVANCED NOTIFICATION SCRIPTS
# ========================================================================================
# Comprehensive notification system supporting Teams, Slack, and Email
# Includes rich formatting, deployment status, and quality metrics
# ========================================================================================

set -euo pipefail

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOG_FILE="${SCRIPT_DIR}/notification.log"

# Colors for console output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Error handling
error_exit() {
    echo -e "${RED}ERROR: $1${NC}" >&2
    log "ERROR: $1"
    exit 1
}

# Success message
success_msg() {
    echo -e "${GREEN}SUCCESS: $1${NC}"
    log "SUCCESS: $1"
}

# Warning message
warning_msg() {
    echo -e "${YELLOW}WARNING: $1${NC}"
    log "WARNING: $1"
}

# Info message
info_msg() {
    echo -e "${BLUE}INFO: $1${NC}"
    log "INFO: $1"
}

# ========================================================================================
# MICROSOFT TEAMS NOTIFICATION FUNCTIONS
# ========================================================================================

send_teams_notification() {
    local webhook_url="$1"
    local status="$2"
    local build_status="$3"
    local test_coverage="$4"
    local build_size="$5"
    local security_scan="$6"
    local deployment_url="$7"
    
    info_msg "Sending Teams notification..."
    
    # Determine status color and emoji
    local status_color
    local status_emoji
    case "$status" in
        "success")
            status_color="00FF00"
            status_emoji="✅"
            ;;
        "warning")
            status_color="FFFF00"
            status_emoji="⚠️"
            ;;
        "failed"|"failure")
            status_color="FF0000"
            status_emoji="❌"
            ;;
        *)
            status_color="808080"
            status_emoji="ℹ️"
            ;;
    esac
    
    # Create Teams adaptive card payload
    cat << EOF > teams-payload.json
{
    "@type": "MessageCard",
    "@context": "http://schema.org/extensions",
    "themeColor": "$status_color",
    "summary": "CI/CD Pipeline: $status_emoji $status",
    "sections": [
        {
            "activityTitle": "React App CI/CD Pipeline",
            "activitySubtitle": "Repository: ${GITHUB_REPOSITORY:-'N/A'}",
            "activityImage": "https://github.com/github.png",
            "facts": [
                {
                    "name": "🎯 Overall Status",
                    "value": "$status_emoji **$status**"
                },
                {
                    "name": "🌿 Branch",
                    "value": "${GITHUB_REF_NAME:-'N/A'}"
                },
                {
                    "name": "💾 Commit",
                    "value": "${GITHUB_SHA:0:8:-'N/A'}"
                },
                {
                    "name": "🏗️ Build Status",
                    "value": "$build_status"
                },
                {
                    "name": "🧪 Test Coverage",
                    "value": "${test_coverage}%"
                },
                {
                    "name": "📦 Build Size",
                    "value": "${build_size}MB"
                },
                {
                    "name": "🔒 Security Scan",
                    "value": "$security_scan"
                }
            ],
            "markdown": true
        }
    ],
    "potentialAction": [
        {
            "@type": "OpenUri",
            "name": "View Pipeline",
            "targets": [
                {
                    "os": "default",
                    "uri": "${GITHUB_SERVER_URL:-'https://github.com'}/${GITHUB_REPOSITORY:-''}/actions/runs/${GITHUB_RUN_ID:-''}"
                }
            ]
        }
EOF

    # Add deployment URL if available
    if [[ -n "$deployment_url" && "$deployment_url" != "N/A" ]]; then
        cat << EOF >> teams-payload.json
        ,
        {
            "@type": "OpenUri",
            "name": "View Deployment",
            "targets": [
                {
                    "os": "default",
                    "uri": "$deployment_url"
                }
            ]
        }
EOF
    fi

    cat << EOF >> teams-payload.json
    ]
}
EOF

    # Send notification
    if curl -H "Content-Type: application/json" \
            -H "User-Agent: GitHub-Actions-CI/CD" \
            -d @teams-payload.json \
            --silent --show-error \
            --max-time 30 \
            "$webhook_url"; then
        success_msg "Teams notification sent successfully"
    else
        error_exit "Failed to send Teams notification"
    fi
}

# ========================================================================================
# SLACK NOTIFICATION FUNCTIONS
# ========================================================================================

send_slack_notification() {
    local webhook_url="$1"
    local status="$2"
    local build_status="$3"
    local test_coverage="$4"
    local build_size="$5"
    local security_scan="$6"
    local deployment_url="$7"
    
    info_msg "Sending Slack notification..."
    
    # Determine status color and emoji
    local status_color
    local status_emoji
    case "$status" in
        "success")
            status_color="good"
            status_emoji="✅"
            ;;
        "warning")
            status_color="warning"
            status_emoji="⚠️"
            ;;
        "failed"|"failure")
            status_color="danger"
            status_emoji="❌"
            ;;
        *)
            status_color="#808080"
            status_emoji="ℹ️"
            ;;
    esac
    
    # Create Slack message payload
    cat << EOF > slack-payload.json
{
    "text": "CI/CD Pipeline Result: $status_emoji $status",
    "username": "GitHub Actions",
    "icon_emoji": ":github:",
    "attachments": [
        {
            "color": "$status_color",
            "title": "React App CI/CD Pipeline Results",
            "title_link": "${GITHUB_SERVER_URL:-'https://github.com'}/${GITHUB_REPOSITORY:-''}/actions/runs/${GITHUB_RUN_ID:-''}",
            "fields": [
                {
                    "title": "Repository",
                    "value": "${GITHUB_REPOSITORY:-'N/A'}",
                    "short": true
                },
                {
                    "title": "Branch",
                    "value": "${GITHUB_REF_NAME:-'N/A'}",
                    "short": true
                },
                {
                    "title": "Commit",
                    "value": "<${GITHUB_SERVER_URL:-'https://github.com'}/${GITHUB_REPOSITORY:-''}/commit/${GITHUB_SHA:-''}|${GITHUB_SHA:0:8:-'N/A'}>",
                    "short": true
                },
                {
                    "title": "Build Status",
                    "value": "$build_status",
                    "short": true
                },
                {
                    "title": "Test Coverage",
                    "value": "${test_coverage}%",
                    "short": true
                },
                {
                    "title": "Build Size",
                    "value": "${build_size}MB",
                    "short": true
                },
                {
                    "title": "Security Scan",
                    "value": "$security_scan",
                    "short": true
                },
                {
                    "title": "Quality Level",
                    "value": "${QUALITY_LEVEL:-'standard'}",
                    "short": true
                }
            ],
            "footer": "GitHub Actions",
            "footer_icon": "https://github.com/github.png",
            "ts": $(date +%s)
        }
EOF

    # Add deployment field if URL is available
    if [[ -n "$deployment_url" && "$deployment_url" != "N/A" ]]; then
        cat << EOF >> slack-payload.json
        ,
        {
            "color": "$status_color",
            "title": "🚀 Deployment",
            "fields": [
                {
                    "title": "Application URL",
                    "value": "<$deployment_url|View Deployment>",
                    "short": false
                }
            ]
        }
EOF
    fi

    cat << EOF >> slack-payload.json
    ]
}
EOF

    # Send notification
    if curl -X POST \
            -H "Content-Type: application/json" \
            -H "User-Agent: GitHub-Actions-CI/CD" \
            -d @slack-payload.json \
            --silent --show-error \
            --max-time 30 \
            "$webhook_url"; then
        success_msg "Slack notification sent successfully"
    else
        error_exit "Failed to send Slack notification"
    fi
}

# ========================================================================================
# EMAIL NOTIFICATION FUNCTIONS
# ========================================================================================

send_email_notification() {
    local recipient="$1"
    local status="$2"
    local build_status="$3"
    local test_coverage="$4"
    local build_size="$5"
    local security_scan="$6"
    local deployment_url="$7"
    
    info_msg "Preparing email notification..."
    
    local subject="CI/CD Pipeline ${status^}: ${GITHUB_REPOSITORY:-'Unknown Repository'}"
    
    # Create HTML email content
    cat << EOF > email-content.html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>CI/CD Pipeline Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5; }
        .container { max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; padding: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .header { text-align: center; border-bottom: 2px solid #e1e4e8; padding-bottom: 20px; margin-bottom: 20px; }
        .status-success { color: #28a745; }
        .status-warning { color: #ffc107; }
        .status-failed { color: #dc3545; }
        .metrics-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .metrics-table th, .metrics-table td { padding: 12px; text-align: left; border-bottom: 1px solid #e1e4e8; }
        .metrics-table th { background-color: #f6f8fa; font-weight: bold; }
        .button { display: inline-block; padding: 10px 20px; background-color: #0366d6; color: white; text-decoration: none; border-radius: 4px; margin: 10px 5px; }
        .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e1e4e8; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>CI/CD Pipeline Report</h1>
            <h2 class="status-$status">Status: ${status^}</h2>
        </div>
        
        <h3>Pipeline Summary</h3>
        <table class="metrics-table">
            <tr>
                <th>Metric</th>
                <th>Value</th>
                <th>Status</th>
            </tr>
            <tr>
                <td>Repository</td>
                <td>${GITHUB_REPOSITORY:-'N/A'}</td>
                <td>-</td>
            </tr>
            <tr>
                <td>Branch</td>
                <td>${GITHUB_REF_NAME:-'N/A'}</td>
                <td>-</td>
            </tr>
            <tr>
                <td>Commit</td>
                <td>${GITHUB_SHA:0:8:-'N/A'}</td>
                <td>-</td>
            </tr>
            <tr>
                <td>Build</td>
                <td>Application Build</td>
                <td>$build_status</td>
            </tr>
            <tr>
                <td>Test Coverage</td>
                <td>${test_coverage}%</td>
                <td>$([ "${test_coverage%.*}" -ge 70 ] && echo "✅ Passed" || echo "⚠️ Warning")</td>
            </tr>
            <tr>
                <td>Bundle Size</td>
                <td>${build_size}MB</td>
                <td>$([ "${build_size%.*}" -le 5 ] && echo "✅ Passed" || echo "⚠️ Large")</td>
            </tr>
            <tr>
                <td>Security Scan</td>
                <td>Vulnerability Check</td>
                <td>$security_scan</td>
            </tr>
        </table>
        
        <h3>Quick Actions</h3>
        <a href="${GITHUB_SERVER_URL:-'https://github.com'}/${GITHUB_REPOSITORY:-''}/actions/runs/${GITHUB_RUN_ID:-''}" class="button">View Pipeline</a>
EOF

    if [[ -n "$deployment_url" && "$deployment_url" != "N/A" ]]; then
        echo "<a href=\"$deployment_url\" class=\"button\">View Deployment</a>" >> email-content.html
    fi

    cat << EOF >> email-content.html
        
        <div class="footer">
            <p>This email was automatically generated by GitHub Actions CI/CD Pipeline</p>
            <p>Repository: ${GITHUB_REPOSITORY:-'N/A'} | Run ID: ${GITHUB_RUN_ID:-'N/A'}</p>
        </div>
    </div>
</body>
</html>
EOF

    info_msg "Email content prepared (HTML format available)"
    info_msg "To send email, configure SMTP settings in your environment"
    success_msg "Email notification prepared successfully"
}

# ========================================================================================
# QUALITY METRICS NOTIFICATION
# ========================================================================================

send_quality_metrics_notification() {
    local webhook_url="$1"
    local platform="$2"
    local quality_grade="$3"
    local coverage="$4"
    local complexity="$5"
    local duplication="$6"
    
    info_msg "Sending quality metrics notification to $platform..."
    
    case "$platform" in
        "teams")
            cat << EOF > quality-teams-payload.json
{
    "@type": "MessageCard",
    "@context": "http://schema.org/extensions",
    "themeColor": "$([ "$quality_grade" = "A" ] && echo "00FF00" || ([ "$quality_grade" = "B" ] && echo "FFFF00" || echo "FF0000"))",
    "summary": "Quality Report: Grade $quality_grade",
    "sections": [
        {
            "activityTitle": "📊 Code Quality Report",
            "activitySubtitle": "Comprehensive quality analysis results",
            "facts": [
                {"name": "🎯 Overall Grade", "value": "$quality_grade"},
                {"name": "🧪 Test Coverage", "value": "${coverage}%"},
                {"name": "🧮 Complexity Score", "value": "$complexity/100"},
                {"name": "📋 Duplication Score", "value": "$duplication/100"},
                {"name": "📅 Analysis Date", "value": "$(date +'%Y-%m-%d %H:%M UTC')"}
            ]
        }
    ]
}
EOF
            curl -H "Content-Type: application/json" -d @quality-teams-payload.json "$webhook_url"
            ;;
        "slack")
            local color
            case "$quality_grade" in
                "A"|"B") color="good" ;;
                "C") color="warning" ;;
                *) color="danger" ;;
            esac
            
            cat << EOF > quality-slack-payload.json
{
    "text": "📊 Code Quality Report: Grade $quality_grade",
    "attachments": [
        {
            "color": "$color",
            "title": "Quality Metrics Dashboard",
            "fields": [
                {"title": "Overall Grade", "value": "$quality_grade", "short": true},
                {"title": "Test Coverage", "value": "${coverage}%", "short": true},
                {"title": "Complexity Score", "value": "$complexity/100", "short": true},
                {"title": "Duplication Score", "value": "$duplication/100", "short": true}
            ],
            "footer": "Quality Analysis",
            "ts": $(date +%s)
        }
    ]
}
EOF
            curl -X POST -H "Content-Type: application/json" -d @quality-slack-payload.json "$webhook_url"
            ;;
    esac
}

# ========================================================================================
# DEPLOYMENT STATUS NOTIFICATION
# ========================================================================================

send_deployment_notification() {
    local webhook_url="$1"
    local platform="$2"
    local environment="$3"
    local status="$4"
    local deployment_url="$5"
    local health_status="$6"
    
    info_msg "Sending deployment notification to $platform..."
    
    local status_emoji
    case "$status" in
        "success") status_emoji="🚀" ;;
        "failed") status_emoji="💥" ;;
        *) status_emoji="⚡" ;;
    esac
    
    case "$platform" in
        "teams")
            cat << EOF > deployment-teams-payload.json
{
    "@type": "MessageCard",
    "@context": "http://schema.org/extensions",
    "themeColor": "$([ "$status" = "success" ] && echo "00FF00" || echo "FF0000")",
    "summary": "Deployment $status: $environment",
    "sections": [
        {
            "activityTitle": "$status_emoji Deployment Update",
            "activitySubtitle": "Environment: $environment",
            "facts": [
                {"name": "🎯 Status", "value": "$status"},
                {"name": "🌐 Environment", "value": "$environment"},
                {"name": "🔗 URL", "value": "$deployment_url"},
                {"name": "❤️ Health Check", "value": "$health_status"},
                {"name": "⏰ Deployed At", "value": "$(date +'%Y-%m-%d %H:%M UTC')"}
            ]
        }
    ]
}
EOF
            curl -H "Content-Type: application/json" -d @deployment-teams-payload.json "$webhook_url"
            ;;
        "slack")
            cat << EOF > deployment-slack-payload.json
{
    "text": "$status_emoji Deployment $status to $environment",
    "attachments": [
        {
            "color": "$([ "$status" = "success" ] && echo "good" || echo "danger")",
            "title": "Deployment Details",
            "fields": [
                {"title": "Environment", "value": "$environment", "short": true},
                {"title": "Status", "value": "$status", "short": true},
                {"title": "Health Check", "value": "$health_status", "short": true},
                {"title": "URL", "value": "<$deployment_url|View Application>", "short": false}
            ],
            "footer": "Deployment Service",
            "ts": $(date +%s)
        }
    ]
}
EOF
            curl -X POST -H "Content-Type: application/json" -d @deployment-slack-payload.json "$webhook_url"
            ;;
    esac
}

# ========================================================================================
# SECURITY ALERT NOTIFICATION
# ========================================================================================

send_security_alert_notification() {
    local webhook_url="$1"
    local platform="$2"
    local alert_type="$3"
    local severity="$4"
    local message="$5"
    
    info_msg "Sending security alert notification to $platform..."
    
    local status_color
    local status_emoji
    case "$severity" in
        "critical")
            status_color="FF0000"
            status_emoji="🚨"
            ;;
        "high")
            status_color="FF8000"
            status_emoji="⚠️"
            ;;
        "medium")
            status_color="FFFF00"
            status_emoji="⚠️"
            ;;
        *)
            status_color="808080"
            status_emoji="ℹ️"
            ;;
    esac
    
    case "$platform" in
        "teams")
            cat << EOF > security-teams-payload.json
{
    "@type": "MessageCard",
    "@context": "http://schema.org/extensions",
    "themeColor": "$status_color",
    "summary": "Security Alert: $status_emoji $alert_type",
    "sections": [
        {
            "activityTitle": "$status_emoji Security Alert",
            "activitySubtitle": "$alert_type - Severity: $severity",
            "facts": [
                {"name": "🔒 Alert Type", "value": "$alert_type"},
                {"name": "⚡ Severity", "value": "$severity"},
                {"name": "📝 Message", "value": "$message"},
                {"name": "🌿 Branch", "value": "${GITHUB_REF_NAME:-'N/A'}"},
                {"name": "💾 Commit", "value": "${GITHUB_SHA:0:8:-'N/A'}"},
                {"name": "⏰ Detected At", "value": "$(date +'%Y-%m-%d %H:%M UTC')"}
            ]
        }
    ],
    "potentialAction": [
        {
            "@type": "OpenUri",
            "name": "View Security Report",
            "targets": [
                {
                    "os": "default",
                    "uri": "${GITHUB_SERVER_URL:-'https://github.com'}/${GITHUB_REPOSITORY:-''}/security"
                }
            ]
        }
    ]
}
EOF
            curl -H "Content-Type: application/json" -d @security-teams-payload.json "$webhook_url"
            ;;
        "slack")
            local color
            case "$severity" in
                "critical"|"high") color="danger" ;;
                "medium") color="warning" ;;
                *) color="#808080" ;;
            esac
            
            cat << EOF > security-slack-payload.json
{
    "text": "$status_emoji Security Alert: $alert_type",
    "attachments": [
        {
            "color": "$color",
            "title": "Security Vulnerability Detected",
            "fields": [
                {"title": "Alert Type", "value": "$alert_type", "short": true},
                {"title": "Severity", "value": "$severity", "short": true},
                {"title": "Branch", "value": "${GITHUB_REF_NAME:-'N/A'}", "short": true},
                {"title": "Commit", "value": "${GITHUB_SHA:0:8:-'N/A'}", "short": true},
                {"title": "Details", "value": "$message", "short": false}
            ],
            "footer": "Security Scanner",
            "ts": $(date +%s)
        }
    ]
}
EOF
            curl -X POST -H "Content-Type: application/json" -d @security-slack-payload.json "$webhook_url"
            ;;
    esac
}

# ========================================================================================
# CLEANUP NOTIFICATION
# ========================================================================================

send_cleanup_notification() {
    local webhook_url="$1"
    local platform="$2"
    local cleanup_type="$3"
    local status="$4"
    local details="$5"
    
    info_msg "Sending cleanup notification to $platform..."
    
    local status_color
    local status_emoji
    case "$status" in
        "success")
            status_color="00FF00"
            status_emoji="🧹"
            ;;
        "warning")
            status_color="FFFF00"
            status_emoji="⚠️"
            ;;
        "failed")
            status_color="FF0000"
            status_emoji="❌"
            ;;
        *)
            status_color="808080"
            status_emoji="ℹ️"
            ;;
    esac
    
    case "$platform" in
        "teams")
            cat << EOF > cleanup-teams-payload.json
{
    "@type": "MessageCard",
    "@context": "http://schema.org/extensions",
    "themeColor": "$status_color",
    "summary": "Cleanup: $status_emoji $cleanup_type",
    "sections": [
        {
            "activityTitle": "$status_emoji Resource Cleanup",
            "activitySubtitle": "$cleanup_type cleanup $status",
            "facts": [
                {"name": "🧹 Cleanup Type", "value": "$cleanup_type"},
                {"name": "📊 Status", "value": "$status"},
                {"name": "📝 Details", "value": "$details"},
                {"name": "📦 Repository", "value": "${GITHUB_REPOSITORY:-'N/A'}"},
                {"name": "⏰ Completed At", "value": "$(date +'%Y-%m-%d %H:%M UTC')"}
            ]
        }
    ]
}
EOF
            curl -H "Content-Type: application/json" -d @cleanup-teams-payload.json "$webhook_url"
            ;;
        "slack")
            local color
            case "$status" in
                "success") color="good" ;;
                "warning") color="warning" ;;
                "failed") color="danger" ;;
                *) color="#808080" ;;
            esac
            
            cat << EOF > cleanup-slack-payload.json
{
    "text": "$status_emoji $cleanup_type cleanup $status",
    "attachments": [
        {
            "color": "$color",
            "title": "Resource Cleanup Report",
            "fields": [
                {"title": "Cleanup Type", "value": "$cleanup_type", "short": true},
                {"title": "Status", "value": "$status", "short": true},
                {"title": "Repository", "value": "${GITHUB_REPOSITORY:-'N/A'}", "short": true},
                {"title": "Details", "value": "$details", "short": false}
            ],
            "footer": "Cleanup Service",
            "ts": $(date +%s)
        }
    ]
}
EOF
            curl -X POST -H "Content-Type: application/json" -d @cleanup-slack-payload.json "$webhook_url"
            ;;
    esac
}

# ========================================================================================
# MONITORING SETUP NOTIFICATION
# ========================================================================================

send_monitoring_notification() {
    local webhook_url="$1"
    local platform="$2"
    local setup_type="$3"
    local status="$4"
    local details="$5"
    
    info_msg "Sending monitoring setup notification to $platform..."
    
    local status_color
    local status_emoji
    case "$status" in
        "success")
            status_color="00FF00"
            status_emoji="📊"
            ;;
        "warning")
            status_color="FFFF00"
            status_emoji="⚠️"
            ;;
        "failed")
            status_color="FF0000"
            status_emoji="❌"
            ;;
        *)
            status_color="808080"
            status_emoji="ℹ️"
            ;;
    esac
    
    case "$platform" in
        "teams")
            cat << EOF > monitoring-teams-payload.json
{
    "@type": "MessageCard",
    "@context": "http://schema.org/extensions",
    "themeColor": "$status_color",
    "summary": "Monitoring: $status_emoji $setup_type",
    "sections": [
        {
            "activityTitle": "$status_emoji Monitoring Setup",
            "activitySubtitle": "$setup_type setup $status",
            "facts": [
                {"name": "📊 Setup Type", "value": "$setup_type"},
                {"name": "📈 Status", "value": "$status"},
                {"name": "📝 Details", "value": "$details"},
                {"name": "📦 Repository", "value": "${GITHUB_REPOSITORY:-'N/A'}"},
                {"name": "⏰ Setup At", "value": "$(date +'%Y-%m-%d %H:%M UTC')"}
            ]
        }
    ]
}
EOF
            curl -H "Content-Type: application/json" -d @monitoring-teams-payload.json "$webhook_url"
            ;;
        "slack")
            local color
            case "$status" in
                "success") color="good" ;;
                "warning") color="warning" ;;
                "failed") color="danger" ;;
                *) color="#808080" ;;
            esac
            
            cat << EOF > monitoring-slack-payload.json
{
    "text": "$status_emoji $setup_type monitoring setup $status",
    "attachments": [
        {
            "color": "$color",
            "title": "Monitoring Setup Report",
            "fields": [
                {"title": "Setup Type", "value": "$setup_type", "short": true},
                {"title": "Status", "value": "$status", "short": true},
                {"title": "Repository", "value": "${GITHUB_REPOSITORY:-'N/A'}", "short": true},
                {"title": "Details", "value": "$details", "short": false}
            ],
            "footer": "Monitoring Service",
            "ts": $(date +%s)
        }
    ]
}
EOF
            curl -X POST -H "Content-Type: application/json" -d @monitoring-slack-payload.json "$webhook_url"
            ;;
    esac
}

# ========================================================================================
# SIMPLE NOTIFICATION WRAPPER
# ========================================================================================

send_simple_notification() {
    local notification_type="$1"
    local environment="$2"
    local message="$3"
    
    info_msg "Sending simple notification: $notification_type"
    
    # Use default webhook URL from environment
    local webhook_url="${TEAMS_WEBHOOK_URL:-${SLACK_WEBHOOK_URL:-}}"
    local platform="teams"  # Default to teams
    
    if [[ "$webhook_url" == *"slack"* ]]; then
        platform="slack"
    fi
    
    if [[ -z "$webhook_url" ]]; then
        warning_msg "No webhook URL configured, skipping notification"
        return 0
    fi
    
    case "$notification_type" in
        "success")
            send_teams_notification "$webhook_url" "success" "Completed" "N/A" "N/A" "Passed" "$message"
            ;;
        "failure")
            send_teams_notification "$webhook_url" "failure" "Failed" "N/A" "N/A" "Failed" "$message"
            ;;
        "security_alert")
            send_security_alert_notification "$webhook_url" "$platform" "Security Scan" "high" "$message"
            ;;
        "quality_alert")
            send_quality_metrics_notification "$webhook_url" "$platform" "C" "N/A" "N/A" "N/A"
            ;;
        "cleanup_success")
            send_cleanup_notification "$webhook_url" "$platform" "$environment" "success" "$message"
            ;;
        "cleanup_warning")
            send_cleanup_notification "$webhook_url" "$platform" "$environment" "warning" "$message"
            ;;
        "monitoring_setup")
            send_monitoring_notification "$webhook_url" "$platform" "$environment" "success" "$message"
            ;;
        *)
            warning_msg "Unknown simple notification type: $notification_type, sending as generic message"
            send_teams_notification "$webhook_url" "info" "$notification_type" "N/A" "N/A" "N/A" "$message"
            ;;
    esac
}

# ========================================================================================
# MAIN NOTIFICATION DISPATCHER
# ========================================================================================

main() {
    local notification_type="${1:-'pipeline'}"
    local platform="${2:-'teams'}"
    
    case "$notification_type" in
        "pipeline")
            # Standard pipeline notification
            local webhook_url="${TEAMS_WEBHOOK_URL:-${SLACK_WEBHOOK_URL:-}}"
            local status="${PIPELINE_STATUS:-'unknown'}"
            local build_status="${BUILD_STATUS:-'N/A'}"
            local test_coverage="${TEST_COVERAGE:-'N/A'}"
            local build_size="${BUILD_SIZE:-'N/A'}"
            local security_scan="${SECURITY_SCAN:-'N/A'}"
            local deployment_url="${DEPLOYMENT_URL:-'N/A'}"
            
            if [[ -z "$webhook_url" ]]; then
                error_exit "No webhook URL configured"
            fi
            
            case "$platform" in
                "teams")
                    send_teams_notification "$webhook_url" "$status" "$build_status" "$test_coverage" "$build_size" "$security_scan" "$deployment_url"
                    ;;
                "slack")
                    send_slack_notification "$webhook_url" "$status" "$build_status" "$test_coverage" "$build_size" "$security_scan" "$deployment_url"
                    ;;
                "email")
                    send_email_notification "${EMAIL_RECIPIENT:-'admin@example.com'}" "$status" "$build_status" "$test_coverage" "$build_size" "$security_scan" "$deployment_url"
                    ;;
                *)
                    error_exit "Unsupported platform: $platform"
                    ;;
            esac
            ;;
        "quality")
            # Quality metrics notification
            local webhook_url="${TEAMS_WEBHOOK_URL:-${SLACK_WEBHOOK_URL:-}}"
            send_quality_metrics_notification "$webhook_url" "$platform" "${QUALITY_GRADE:-'N/A'}" "${TEST_COVERAGE:-'N/A'}" "${COMPLEXITY_SCORE:-'N/A'}" "${DUPLICATION_SCORE:-'N/A'}"
            ;;
        "deployment")
            # Deployment status notification
            local webhook_url="${TEAMS_WEBHOOK_URL:-${SLACK_WEBHOOK_URL:-}}"
            send_deployment_notification "$webhook_url" "$platform" "${ENVIRONMENT:-'production'}" "${DEPLOYMENT_STATUS:-'unknown'}" "${DEPLOYMENT_URL:-'N/A'}" "${HEALTH_STATUS:-'unknown'}"
            ;;
        "security_alert")
            # Security alert notification
            local webhook_url="${TEAMS_WEBHOOK_URL:-${SLACK_WEBHOOK_URL:-}}"
            send_security_alert_notification "$webhook_url" "$platform" "${ALERT_TYPE:-'Security Scan'}" "${SEVERITY:-'high'}" "${3:-'Security vulnerabilities detected'}"
            ;;
        "quality_alert")
            # Quality alert notification (using quality metrics with alert styling)
            local webhook_url="${TEAMS_WEBHOOK_URL:-${SLACK_WEBHOOK_URL:-}}"
            send_quality_metrics_notification "$webhook_url" "$platform" "${QUALITY_GRADE:-'C'}" "${TEST_COVERAGE:-'N/A'}" "${COMPLEXITY_SCORE:-'N/A'}" "${DUPLICATION_SCORE:-'N/A'}"
            ;;
        "cleanup_success"|"cleanup_warning")
            # Cleanup notification
            local webhook_url="${TEAMS_WEBHOOK_URL:-${SLACK_WEBHOOK_URL:-}}"
            local status="${notification_type#cleanup_}"
            send_cleanup_notification "$webhook_url" "$platform" "${platform:-'repository'}" "$status" "${3:-'Cleanup operation completed'}"
            ;;
        "monitoring_setup")
            # Monitoring setup notification
            local webhook_url="${TEAMS_WEBHOOK_URL:-${SLACK_WEBHOOK_URL:-}}"
            send_monitoring_notification "$webhook_url" "$platform" "${platform:-'application'}" "success" "${3:-'Monitoring setup completed successfully'}"
            ;;
        # Handle simple notification calls with 3 parameters
        "success"|"failure")
            send_simple_notification "$notification_type" "$platform" "${3:-'Operation completed'}"
            ;;
        *)
            # For any unrecognized notification type, try simple notification
            send_simple_notification "$notification_type" "$platform" "${3:-'Unknown notification'}"
            ;;
    esac
    
    success_msg "Notification sent successfully"
}

# Run main function if script is executed directly
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi